import React from 'react'

function Room({ room }) {
    return (
        <div className='row bs'>
            <div className='col-md-5'>
                <img src={room.imageurls[0]} className='smalling' />
            </div>
            <div className='col-md-7'>
                <h1>{room.name}</h1>
                <p>Max Count: {room.maxcount}</p>
                <p>PhoneNumber: {room.phonenumber}</p>
                <p>Type: {room.type}</p>

                <div>
                    <button className='btn btn-primary'>View</button>
                </div>
            </div>
        </div>
    )
}

export default Room
