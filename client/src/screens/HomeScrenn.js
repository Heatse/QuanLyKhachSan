import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'

function HomeScrenn() {
    const [rooms, setRooms] = useState([])
    const [loading, setloading] = useState([])
    const [error, seterror] = useState([])

    useEffect(() => {
        const gets = async () => {

            try {
                setloading(true)
                axios.get('/api/rooms/getallrooms')
                    .then(res => {
                        const temp = res.data;
                        this.setRooms(temp)
                        this.setloading(false)
                    })
                // setRooms(data)

            } catch (error) {
                seterror(true)
                console.log(error)
                setloading(false)
            }
        }
        gets();
    }, [])

    return (
        <div>
            <div className='row'>
                {loading ? (<h1>Loading....</h1>) : error ? (<h1>Error</h1>) : (rooms.map(room => {

                    return <div className='com-md-9'>
                        <Room room={room} />
                    </div>
                }))}
            </div>
        </div>
    )
}

export default HomeScrenn
