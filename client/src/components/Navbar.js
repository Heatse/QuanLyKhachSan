
import React from 'react'
import { MdHotel } from 'react-icons/md'

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/home"><MdHotel className="icon" />Booking</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Đăng Nhập</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">Đăng Kí</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/booking">Booking</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <header>

            </header>
        </div>
    )
}

export default Navbar
