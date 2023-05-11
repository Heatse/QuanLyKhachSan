import React, { useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";
import axios from "axios";
import Swal from 'sweetalert2';


export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [success, setsuccess] = useState()


    async function register() {


        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            try {
                setloading(true);
                const result = await axios.post('http://localhost:5000/api/users/register', user)
                    .then(data => data)
                setloading(false)
                setsuccess(true)

                setName('')
                setEmail('')
                setPassword('')
                setCpassword('')

                Swal.fire('Chúc Mừng', 'Bạn đã đăng kí thành công', 'success').then(result => {
                    window.location.href = '/login'
                })

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
                Swal.fire('Lỗi', 'Đăng kí không thành công', 'error')
            }
        }
        else {
            alert('Mật khẩu không trùng khớp')
        }
    }

    return (
        <div>
            {loading && (<Loading />)}


            <div className="form-container">
                <div>
                    <div className="form" >
                        <h1 className="text-4xl text-center mb4">Đăng Kí</h1>
                        <input
                            type="name"
                            placeholder="Name"
                            className="form--input"
                            value={name}
                            onChange={e => { setName(e.target.value) }}
                        />
                        <input
                            type="email"
                            placeholder="Email address"
                            className="form--input"
                            value={email}
                            onChange={e => { setEmail(e.target.value) }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form--input"
                            value={password}
                            onChange={e => { setPassword(e.target.value) }}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="form--input"
                            value={cpassword}
                            onChange={e => { setCpassword(e.target.value) }}
                        />

                        <button className="form--submit" onClick={register}>
                            Đăng kí
                        </button>
                        <div>
                            Allready a member ? <Link to={'/Login'}>Login</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

