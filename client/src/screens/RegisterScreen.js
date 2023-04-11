import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    function register() {

        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            console.log(user)
        }
        else {
            alert('Password not match')
        }
    }

    return (
        <div className="form-container">
            <form className="form" >
                <h1 className="text-4xl text-center mb4">Đăng Kí</h1>
                <input
                    type="name"
                    placeholder="Name"
                    className="form--input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="Confirm password"
                    className="form--input"
                    value={cpassword}
                    onChange={e => setCpassword(e.target.value)}
                />

                <button className="form--submit" onClick={register}>
                    Sign up
                </button>
                <div>
                    Allready a member ? <Link to={'/Login'}>Login</Link>
                </div>
            </form>
        </div >
    )
}

