import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from 'moment'

function BookingScreen() {

    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [room, setroom] = useState()
    const { id, fromdate, todate } = useParams();
    const firstdate = moment(fromdate, 'DD-MM-YYYY')
    const lastdate = moment(todate, 'DD-MM-YYYY')

    const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1
    const [totalamount, setTotalamout] = useState()



    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const data = (await axios.post('http://localhost:5000/api/rooms/getroombyid', { roomid: id })).data

                setTotalamout(data.rentperday * totaldays)
                setroom(data)
                setloading(false)
            } catch (error) {
                seterror(true)
                setloading(false)
            }
        };
        fetchData();
    }, []);

    async function bookRoom() {
        const BookingDetail = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser')).data._id,
            fromdate,
            todate,
            totalamount,
            totaldays,

        }
        try {
            const result = await axios.post('http://localhost:5000/api/bookings/bookroom', BookingDetail)
            console.log(result.data);
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <div className="m-5">
            {loading ? (<Loading />) : room ?
                (<div>
                    <div className="row justify-content-center mt-5 bs">

                        <div className="col-md-5">
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} className='bigimg' />
                        </div>

                        <div className="col-md-5">
                            <div style={{ textAlign: 'right' }}>
                                <h1>Thông tin khách sạn</h1>
                                <hr />
                                <b>
                                    <p>Tên: {JSON.parse(localStorage.getItem('currentUser')).data.name} </p>
                                    <p>Ngày đặt: {fromdate}</p>
                                    <p>Ngày trả: {todate}</p>
                                    <p>Số lượng: {room.maxcount}</p>
                                </b>
                            </div>


                            <div style={{ textAlign: 'right' }}>
                                <h1>Tổng tiền</h1>
                                <hr />
                                <b>
                                    <p>Số ngày đặt: {totaldays}</p>
                                    <p>Tiền phòng: {room.rentperday} $/1 night</p>
                                    <p>Tổng Tiền: {totalamount}</p>
                                </b>
                            </div>

                            <div style={{ float: 'right' }}>
                                <button className="btn btn-primary" onClick={bookRoom} >PayNow</button>
                            </div>
                        </div>
                    </div>
                </div>) : (<Error />)}
        </div>
    );
}


export default BookingScreen;



