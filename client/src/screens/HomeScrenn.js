import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loading from '../components/Loading'
import Error from "../components/Error";
import { DatePicker } from 'antd';
import 'antd/dist/reset.css'
import moment from 'moment';

const { RangePicker } = DatePicker;

function HomeScrenn() {
    const [rooms, setRooms] = useState([])
    const [loading, setloading] = useState([])
    const [error, seterror] = useState([])

    const [fromdate, setFromdate] = useState()
    const [todate, setTodate] = useState()
    const [dulicateroom, setDulicateroom] = useState([])

    const [search, setSearch] = useState('')
    const [type, setType] = useState('all')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const data = (await axios.get('http://localhost:5000/api/rooms/rooms')).data
                setRooms(data)
                setDulicateroom(data)
                setloading(false)

            } catch (error) {
                seterror(true)
                console.log(error)
                setloading(false)
            }
        }
        fetchData();
    }, [])

    function filterByDate(dates) {
        setFromdate((dates[0]).format('DD-MM-YYYY'))
        setTodate((dates[1]).format('DD-MM-YYYY'))

        var tempRooms = []

        for (const room of dulicateroom) {
            var availability = false
            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    //check between or equal to dates
                    if (
                        !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                            booking.fromdate,
                            booking.todate
                        ) &&
                        !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                            booking.fromdate,
                            booking.todate
                        )
                    ) {
                        if (
                            dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
                            dates[0].format("DD-MM-YYYY") !== booking.todate &&
                            dates[1].format("DD-MM-YYYY") !== booking.fromdate &&
                            dates[1].format("DD-MM-YYYY") !== booking.todate
                        ) {
                            availability = true;
                        }
                    }
                }
            }
            else {
                availability = true;
            }
            if (availability === true) {
                tempRooms.push(room);
            }
        }
        setRooms(tempRooms);
    }


    function filterBySearch() {
        const searchRooms = dulicateroom.filter(room => room.name.toLowerCase().includes(search.toLowerCase()))

        setRooms(searchRooms)
    }

    function filterBytype(e) {

        setType(e)

        if (e !== 'all') {
            const searchType = dulicateroom.filter(room => room.type.toLowerCase() === e.toLowerCase())

            setRooms(searchType)
        }
        else {
            setRooms(dulicateroom)
        }
    }

    return (
        <div className='backgrondIMG' >
            <div className='container' >

                <div className='row mt-5 bs'>
                    <div className='col-md-3 ml-5'>
                        <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                    </div>

                    <div className='col-md-5'>
                        <input type='text' className='form-control' placeholder='Tìm phòng'
                            value={search} onChange={(e) => { setSearch(e.target.value) }} onKeyUp={filterBySearch}
                        />
                    </div>

                    <div className='col-md-3'>
                        <select className='form-control' value={type} onChange={(e) => { filterBytype(e.target.value) }}>
                            <option value='all'>All</option>
                            <option value='delux'>Delux</option>
                            <option value='non-delux'>Non-Delux</option>
                        </select>
                    </div>

                </div>

                <div className='row justify-content-center mt-5'>
                    {loading ? (<Loading />) : (rooms.map(room => {
                        return <div className='col-md-9 mt-3'>
                            <Room
                                room={room}
                                fromdate={fromdate}
                                todate={todate}
                            />
                        </div>;
                    }))}
                </div>
            </div>
        </div>
    )
}

export default HomeScrenn
