import React from 'react'
import { Link } from 'react-router-dom'

function LandingScrenn() {
    return (
        <div className='row landing'>

            <div className='col-md-12 text-center'>
                <h2 className='ani1' style={{ color: 'white', fontSize: '150px' }}>BOOKING</h2>
                <h1 className='ani2' style={{ color: 'white' }}>Tận hưởng không gian như chính ngôi nhà của bạn</h1>

                <Link to='/home'>
                    <button className='btn landingbtn glow-on-hover' style={{ color: 'green' }}>Đặt Phòng Nào !</button>
                </Link>

            </div>



        </div>
    )
}

export default LandingScrenn
