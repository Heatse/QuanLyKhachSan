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

            setloading(true)
            const response = (await axios.get('/api/rooms/getallrooms'))
            setData(response.data)
            setRooms(data)
            setloading(false)
            console.log(response.data)
        }
        gets();
    }, [])

    return (
        <div>
            <div className='row'>
                {loading ? (<h1>Loading....</h1>) : (data.map(room => {

                    return <div className='com-md-9'>
                        <Room room={room} />
                    </div>
                }))}
            </div>
        </div>
    )
}

export default HomeScrenn
