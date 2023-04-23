import React, { useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading";
import Error from "../components/Error";
import axios from "axios";

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    async function Login() {


        const user = {
            email,
            password,
        }
        try {
            setloading(true)
            const result = await axios.post('http://localhost:5000/api/users/login', user)
                .then(data => data)
            setloading(false)

            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/home'
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
        }
    }

    return (
        <div>
            {loading && (<Loading />)}
            <div className="form-container">
                {error && (<Error message='Đăng nhập thất bại' />)}
                <div className="form" >
                    <h1 className="text-4xl text-center mb4">Đăng nhập</h1>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="form--input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form--input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Link className="underline text-bn" to={'/forget-password'}>Quên mật khẩu ?</Link>

                    <button className="form--submit" onClick={Login}>
                        Đăng nhập
                    </button>
                    <div>
                        Don't have account yet ? <Link className="underline text-bn" to={'/Register'}>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

