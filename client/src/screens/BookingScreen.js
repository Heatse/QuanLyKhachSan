import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Bookingscreen() {
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [room, setroom] = useState()

    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const data = (await axios.post('http://localhost:5000/api/rooms/getroombyid', { roomid: id })).data
                console.log(data);
                setroom(data)
                setloading(false)
            } catch (error) {
                seterror(true)
                setloading(false)
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {loading ? (<h1>loading...</h1>) : <div>

                <div className="row">
                    <div className="col-md-5">
                        <h1>{room.name}</h1>
                        <img src="{room.imageurls[0]} " className="biging" />
                    </div>

                    <div className="col-md-5">

                    </div>
                </div>

            </div>}
        </div>
    );
}

export default Bookingscreen;



