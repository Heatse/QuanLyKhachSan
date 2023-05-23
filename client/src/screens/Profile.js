import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loading from "../components/Loading";
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
                <TabPane tab="Thông tin cá nhân" key="1">
                    <div className='row'>
                        <div className='col-md-5 bs'>
                            <h1>Thông tin cá nhân</h1> <br />
                            <h1>Tên: {user.data.name}</h1>
                            <h1>Email: {user.data.email}</h1>
                            <h1>Quyền quản lí: {user.data.isAdmin ? (<Tag color='green'>YES</Tag>) : (<Tag color="red">NO</Tag>)}</h1>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Lịch sử đặt phòng" key="2">
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

    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true)
            const result = await axios.post('http://localhost:5000/api/bookings/cancelbooking', { bookingid, roomid }).then(data => data)
            console.log(result)
            setloading(false)
            Swal.fire('Chúc Mừng', 'Hủy phòng thành công', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
            Swal.fire('Lỗi', 'Hủy phòng không thành công', 'error')
        }
    }

    async function handleCancel(bookingid, roomid) {
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn hủy đặt phòng này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => cancelBooking(bookingid, roomid)
                },
                {
                    label: 'Không',
                    onClick: () => { }
                }
            ]
        });
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loading />)}
                    {booking && (booking.map(booking => {
                        return (
                            <div className='bs'>
                                <h1>{booking.room}</h1>
                                <p><b>BookingID</b>: {booking._id}</p>
                                <p><b>Ngày nhận</b>: {booking.fromdate}</p>
                                <p><b>Ngày trả</b>: {booking.todate}</p>
                                <p><b>Tổng Tiền</b>: {booking.totalamount} ($)</p>
                                <p>
                                    <b>Trạng Thái</b>: {""}
                                    {booking.status === 'Đã Hủy' ? (<Tag color='red'>Đã Hủy</Tag>) : (<Tag color="green">Đã Đặt</Tag>)}
                                </p>

                                {booking.status !== 'Đã Hủy' && (<div className='text-right'>
                                    <button className='btn btn-primary' onClick={() => { handleCancel(booking._id, booking.roomid) }}>
                                        Hủy Đặt Phòng
                                    </button>
                                </div>)}
                            </div>
                        )
                    }))}
                </div>
            </div>
        </div>
    )
}