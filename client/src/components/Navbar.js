
import React from 'react'
import { MdHotel } from 'react-icons/md'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    function Logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "/login";
    }
    return (
        <div >
            <nav className="navbar navbar-expand-lg" >
                <a className="navbar-brand" href="/home"><MdHotel className="icon" />Booking</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"><i class="fa-solid fa-bars" style={{ color: 'white' }} ></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-5">
                        {user ? (
                            <>
                                <div class="dropdown">
                                    <button
                                        class="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="fa-solid fa-user mr-2"></i>{user.data.name}
                                    </button>
                                    <div
                                        class="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton"
                                    >
                                        <a class="dropdown-item" href="/profile">
                                            Profile
                                        </a>
                                        <a class="dropdown-item" href="#" onClick={Logout}>
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link " href="/login">Đăng Nhập</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Đăng Kí</a>
                                </li>
                            </>)}

                    </ul>
                </div>
            </nav>

            <header>

            </header>
        </div>
    )
}

export default Navbar
