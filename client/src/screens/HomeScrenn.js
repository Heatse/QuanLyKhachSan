import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'

function HomeScrenn() {
    const [data, setData] = useState([])
    const [rooms, setRooms] = useState([])
    const [loading, setloading] = useState([])
    const [error, seterror] = useState([])

    useEffect(() => {
        const gets = async () => {
            try {
                setloading(true)
                const data = (await axios.get('http://localhost:5000/api/rooms/rooms')).data
                setRooms(data)
                setloading(false)

            } catch (error) {
                seterror(true)
                console.log(error)
                setloading(false)
            }
        }
        gets();
    }, [])

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                {(rooms.map(room => {
                    return <div>
                        <Room room={room} />
                    </div>;
                }))}
            </div>
        </div>
    )
}

export default HomeScrenn
