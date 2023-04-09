import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function LoginScreen() {

    return (
        <div className="form-container">
            <form className="form" >
                <input
                    type="email"
                    placeholder="Email address"
                    className="form--input"
                    name="email"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form--input"
                    name="password"

                />

                <button className="form--submit">
                    Login
                </button>
                <div>
                    Don't have account yet ? <Link className="underline text-bn" to={'/Register'}>Register</Link>
                </div>
            </form>
        </div>
    )
}

