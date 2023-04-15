import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function BookingScreen() {
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [room, setroom] = useState()
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const data = (await axios.post('http://localhost:5000/api/rooms/getroombyid', { roomid: id })).data

                setroom(data)
                setloading(false)
                console.log(data);
            } catch (error) {
                seterror(true)
                setloading(false)
            }
        };
        fetchData();
    }, []);

    return (
        <div className="m-5">
            {loading ? (<Loading />) : room ?
                (<div>
                    <div className="row justify-content-center mt-5 bs">

                        <div className="col-md-4">
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} className="imging" />
                        </div>

                        <div className="col-md-5">
                            <div style={{ textAlign: 'right' }}>
                                <h1>Thông tin khách sạn</h1>
                                <hr />
                                <b>
                                    <p>Tên: </p>
                                    <p>Ngày đặt:</p>
                                    <p>Ngày trả:</p>
                                    <p>Số lượng: {room.maxcount}</p>
                                </b>
                            </div>


                            <div style={{ textAlign: 'right' }}>
                                <h1>Tổng tiền</h1>
                                <hr />
                                <b>
                                    <p>Total days: </p>
                                    <p>Rent per day: {room.rentperday}</p>
                                    <p>Tổng Tiền:</p>
                                </b>
                            </div>

                            <div style={{ float: 'right' }}>
                                <button className="btn btn-primary">PayNow</button>
                            </div>
                        </div>
                    </div>
                </div>) : (<Error />)}
        </div>
    );
}


export default BookingScreen;



