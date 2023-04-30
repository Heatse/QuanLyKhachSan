import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loading from '../components/Loading';
const { TabPane } = Tabs;



function AdminScreen() {

    // useEffect(() => {
    //     if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
    //         window.location.href = '/home'
    //     }
    // }, [])


    function callback(key) {
        console.log(key);
    }
    return (

        < div className='mt-3 ml-3 mr-3 bs'>

            <h1 className='text-center' style={{ fontSize: '100px' }}><b>Trang quản lý</b></h1>
            <div className='gl' >
                <Tabs Tabs defaultActiveKey='1' onChange={callback}>
                    <TabPane tab="Danh sách đặt phòng" key="1">
                        <Booking />
                    </TabPane>
                    <TabPane tab="Danh sách phòng" key="2">
                        <Room />
                    </TabPane>
                    <TabPane tab="Thêm phòng" key="3">
                        <AddRoom />
                    </TabPane>
                    <TabPane tab="Khách hàng" key="4">
                        <Customer />
                    </TabPane>
                </Tabs>
            </div>

        </div>

    )
}

export default AdminScreen


export function Booking() {
    const [booking, setBooking] = useState([])
    const [loading, setloading] = useState([])
    const [error, seterror] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await (await axios.get('http://localhost:5000/api/bookings/getallbookings')).data
                setBooking(data)
                setloading(false)

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
            }
        }
        fetchData();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Booking</h1>
                {loading && <Loading />}
                <table>
                    <table className='table table-bordered'>
                        <thead className='bs'>
                            <tr>
                                <th>Id Phòng</th>
                                <th>Id Khách Hàng</th>
                                <th>Phòng</th>
                                <th>Ngày đặt</th>
                                <th>Ngày trả</th>
                                <th>Id phòng</th>
                            </tr>
                        </thead>

                        <tbody>
                            {booking.length && (booking.map(booking => {
                                return <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>

                                </tr>
                            }))}
                        </tbody>
                    </table>
                </table>

            </div>
        </div>
    )
}

export function Room() {

    const [room, setRoom] = useState([])
    const [loading, setloading] = useState([])
    const [error, seterror] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await (await axios.get('http://localhost:5000/api/rooms/rooms')).data
                setRoom(data)
                setloading(false)

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
            }
        }
        fetchData();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Rooms</h1>
                {loading && <Loading />}
                <table>
                    <table className='table table-bordered'>
                        <thead className='bs'>
                            <tr>
                                <th>Id Phòng</th>
                                <th>Tên Phòng</th>
                                <th>Kiểu phòng</th>
                                <th>Tiền thuê</th>
                                <th>Số lượng</th>
                                <th>Phone</th>
                            </tr>
                        </thead>

                        <tbody>
                            {room.length && (room.map(room => {
                                return <tr>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentperday}</td>
                                    <td>{room.maxcount}</td>
                                    <td>{room.phonenumber}</td>

                                </tr>
                            }))}
                        </tbody>
                    </table>
                </table>
            </div>
        </div>
    )
}


export function Customer() {

    const [users, setUsers] = useState([])
    const [loading, setloading] = useState([])
    const [error, seterror] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await (await axios.get('http://localhost:5000/api/users/getallusers')).data
                setUsers(data)
                setloading(false)

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
            }
        }
        fetchData();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Customer</h1>
                {loading && <Loading />}
                <table>
                    <table className='table table-bordered'>
                        <thead className='bs'>
                            <tr>
                                <th>Id Khách Hàng</th>
                                <th>Email</th>
                                <th>Tên</th>
                                <th>isAdmin</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length && (users.map(user => {
                                return <tr>
                                    <td>{user._id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>

                                </tr>
                            }))}
                        </tbody>
                    </table>
                </table>
            </div>
        </div>
    )
}



export function AddRoom() {

    const [name, setName] = useState('')
    const [rent, setRent] = useState()
    const [count, setCount] = useState()
    const [desc, setDesc] = useState()
    const [phone, setPhone] = useState()
    const [type, setType] = useState()
    const [linkimg1, setLinkimg1] = useState()
    const [linkimg2, setLinkimg2] = useState()
    const [linkimg3, setLinkimg3] = useState()

    async function addRoom() {

        const newroom = {
            name,
            rent,
            count,
            desc,
            phone,
            type,
            imageurls: [linkimg1, linkimg2, linkimg3]
        }

        try {
            const result = await (await axios.post('http://localhost:5000/api/rooms/addroom', newroom)).data
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='row'>
            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='Tên Phòng'
                    value={name} onChange={(e) => { setName(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Giá Phòng'
                    value={rent} onChange={(e) => { setRent(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Só Lượng'
                    value={count} onChange={(e) => { setCount(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Mô tả'
                    value={desc} onChange={(e) => { setDesc(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Số điện thoại'
                    value={phone} onChange={(e) => { setPhone(e.target.value) }}
                />
            </div>

            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='Kiểu phòng'
                    value={type} onChange={(e) => { setType(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='LinkImg1'
                    value={linkimg1} onChange={(e) => { setLinkimg1(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='LinkImg2'
                    value={linkimg2} onChange={(e) => { setLinkimg2(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='LinkImg3'
                    value={linkimg3} onChange={(e) => { setLinkimg3(e.target.value) }}
                />

                <div className='text-right'>
                    <button className='btn btn-primary' onClick={addRoom}>Thêm Phòng</button>
                </div>
            </div>
        </div>
    )
}
