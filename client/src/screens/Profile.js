import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
const { TabPane } = Tabs;


function Profile() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])


    return (
        <div className='mt-3 ml-3 mr-3'>
            <Tabs Tabs defaultActiveKey='1' >
                <TabPane tab="thong tin ca nha" key="1">
                    <div className='row'>
                        <div className='col-md-5 bs'>
                            <h1>Thong tin ca nhan</h1> <br />
                            <h1>Ten: {user.data.name}</h1>
                            <h1>Email: {user.data.email}</h1>
                            <h1>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h1>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="lich su dat phong" key="2">
                    <MyBooking />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profile


export function MyBooking() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [booking, setBooking] = useState([])
    const [loading, setloading] = useState(false)
    const [success, setsuccess] = useState()
    const [error, seterror] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const rooms = await (await axios.post('http://localhost:5000/api/bookings/getbookinguser', { userid: user.data._id })).data
                console.log(rooms)
                setBooking(rooms)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchData();
    }, [])

    // async function cancelBooking(bookingid, roomid) {
    //     try {
    //         setloading(true)
    //         const result = await axios.post('http://localhost:5000/api/bookings/cancelbooking', { bookingid, roomid }).then(data => data)
    //         console.log(result)
    //         setloading(false)
    //         setsuccess(true)
    //     } catch (error) {
    //         console.log(error)
    //         setloading(false)
    //         seterror(true)
    //     }
    // }

    async function cancelBooking(bookingid, roomid) {
        try {
            await axios.post('http://localhost:5000/api/bookings/cancelbooking', {
                bookingid: bookingid,
                roomid: roomid
            }).data
            setsuccess("Hủy phòng thành công")
            const updatedBookings = booking.filter(b => b._id !== bookingid)
            setBooking(updatedBookings)
        } catch (error) {
            seterror("Đã có lỗi xảy ra")
            console.log(error)
        }
    }

    async function handleCancel(bookingid, roomid) {
        const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đặt phòng này không?")
        if (confirmCancel) {
            await cancelBooking(bookingid, roomid)
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loading />)}
                    {error && (<Error message='Đã có lỗi xảy ra' />)}
                    {success && (<Success message='Hủy phòng thành công' />)}
                    {booking && (booking.map(booking => {
                        return (
                            <div className='bs'>
                                <h1>{booking.room}</h1>
                                <p><b>BookingID</b>: {booking._id}</p>
                                <p><b>Ngày nhận</b>: {booking.fromdate}</p>
                                <p><b>Ngày trả</b>: {booking.todate}</p>
                                <p><b>Tổng Tiền</b>: {booking.totalamount} ($)</p>
                                <p><b>Trạng Thái</b>: {booking.status === 'booked' ? 'Đã Hủy' : 'Đã Đặt'}</p>

                                <div className='text-right'>
                                    <button className='btn btn-primary' onClick={() => { handleCancel(booking._id, booking.roomid) }}>
                                        Hủy Đặt Phòng
                                    </button>
                                </div>
                            </div>
                        )
                    }))}
                </div>
            </div>
        </div>
    )
}