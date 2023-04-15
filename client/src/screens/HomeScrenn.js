import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loading from '../components/Loading'
import Error from "../components/Error";

function HomeScrenn() {
    const [rooms, setRooms] = useState([])
    const [loading, setloading] = useState([])
    const [error, seterror] = useState([])

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, [])

    return (
        <div className='container' >
            <div className='row justify-content-center mt-5'>
                {loading ? (<Loading />) : rooms.length > 1 ? (rooms.map(room => {
                    return <div className='col-md-9 mt-3'>
                        <Room room={room} />
                    </div>;
                })) : (<Error />)}
            </div>
        </div>
    )
}

export default HomeScrenn
