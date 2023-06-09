import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import TextArea from 'antd/es/input/TextArea';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import EditRoom from './EditRoom';
import EditUser from './EditUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const { TabPane } = Tabs;




function AdminScreen() {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).data.isAdmin) {
            window.location.href = '/home'
        }
    }, [])


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

    async function deleteBooking(bookingid) {
        try {
            setloading(true)
            await axios.delete(`http://localhost:5000/api/bookings/deletebooking/${bookingid}`);
            const updatedBooking = booking.filter((booking) => booking._id !== bookingid);
            setBooking(updatedBooking);
            setloading(false)
            Swal.fire({
                icon: 'success',
                title: 'Xóa lịch sử đặt phòng thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then(resrult => {
                window.location.reload()
            });
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
            Swal.fire('Lỗi', 'Xóa lịch sử đặt phòng không thành công', 'error')
        }
    }

    async function handleDeleteBooking(bookingid) {
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn xóa lịch sử đặt phòng này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => deleteBooking(bookingid)
                },
                {
                    label: 'Không',
                    onClick: () => { }
                }
            ]
        });
    }


    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Danh Sách Đặt Phòng</h1>
                {loading && <Loading />}
                <table>
                    <table className='table table-bordered table-striped'>
                        <thead className='bs table-dark'>
                            <tr>
                                <th>Id Phòng</th>
                                <th>Id Khách Hàng</th>
                                <th>Phòng</th>
                                <th>Ngày đặt</th>
                                <th>Ngày trả</th>
                                <th>Trạng thái</th>
                                <th>Action</th>
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
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteBooking(booking._id)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>

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

    const [isShowEditRoom, setIsShowEditRoom] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null);

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

    const handleClose = () => {
        setIsShowEditRoom(false)
    }

    const handleEditRoom = (room) => {
        setSelectedRoom(room);
        setIsShowEditRoom(true);
    };


    const deleteRoom = async (roomId) => {
        try {
            setloading(true)
            const response = await axios.delete(`http://localhost:5000/api/rooms/deleteroom/${roomId}`);
            setRoom(room.filter(r => r._id !== roomId));
            setloading(false)
            Swal.fire({
                icon: 'success',
                title: 'Xóa phòng thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then(resrult => {
                window.location.reload()
            });
        } catch (error) {
            console.log(error);
            setloading(false)
            seterror(true)
            Swal.fire('Oops', "Bạn đã xóa phòng không thành công", 'error')
        }
    };

    async function handleDeleteRoom(roomId) {
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn xóa phòng này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => deleteRoom(roomId)
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
                <div className='col-md-10'>
                    <h1>Danh Sách Phòng</h1>
                    {loading && <Loading />}
                    <table>
                        <table className='table table-bordered table-striped'>
                            <thead className='bs table-dark'>
                                <tr>
                                    <th>Id Phòng</th>
                                    <th>Tên Phòng</th>
                                    <th>Kiểu phòng</th>
                                    <th>Tiền thuê</th>
                                    <th>Số lượng</th>
                                    <th>Phone</th>
                                    <th>Action</th>
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
                                        <td>
                                            <button
                                                class="btn btn-success"
                                                style={{ marginRight: '10px' }}
                                                onClick={() => handleEditRoom(room)}
                                            >
                                                <FaEdit />

                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteRoom(room._id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>

                                    </tr>
                                }))}
                            </tbody>
                        </table>
                    </table>
                </div>
            </div>
            <EditRoom
                show={isShowEditRoom}
                handleClose={handleClose}
                room={selectedRoom}
            />
        </div>

    )
}


export function Customer() {

    const [users, setUsers] = useState([])
    const [loading, setloading] = useState([])
    const [error, seterror] = useState([])

    const [isShowEditUser, setIsShowEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);


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

    const handleClose = () => {
        setIsShowEditUser(false)
    }

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsShowEditUser(true);
    };

    const deleteUser = async (userId) => {
        try {
            setloading(true);
            const response = await axios.delete(`http://localhost:5000/api/users/deleteuser/${userId}`);
            if (response.status === 200) {
                setUsers(users.filter((user) => user._id !== userId));
                setloading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa người dùng thành công!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(resrult => {
                    window.location.reload()
                });
            }
        } catch (err) {
            console.log(error);
            setloading(false)
            seterror(true)
        }
    }

    async function handleDeleteUser(userId) {
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn xóa người dùng này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => deleteUser(userId)
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
                <div className='col-md-12'>
                    <h1>Danh Sách Khách hàng</h1>
                    {loading && <Loading />}
                    <table>
                        <table className='table table-bordered table-striped'>
                            <thead className='bs table-dark'>
                                <tr>
                                    <th>Id Khách Hàng</th>
                                    <th>Email</th>
                                    <th>Tên</th>
                                    <th>Mật Khẩu</th>
                                    <th>isAdmin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.length && (users.map(user => {
                                    return <tr>
                                        <td>{user._id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.name}</td>
                                        <td>{user.password}</td>
                                        <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                        <td>
                                            <button
                                                class="btn btn-success"
                                                style={{ marginRight: '10px' }}
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>

                                    </tr>
                                }))}
                            </tbody>
                        </table>
                    </table>
                </div>
            </div>
            <EditUser
                show={isShowEditUser}
                handleClose={handleClose}
                users={selectedUser}
            />
        </div>
    )
}



export function AddRoom() {
    const [loading, setloading] = useState(false)
    const [name, setName] = useState('')
    const [rentperday, setRentperday] = useState()
    const [maxcount, setMaxcount] = useState()
    const [description, setDescription] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [type, setType] = useState([])
    const [imageurl1, setImageurl1] = useState()
    const [imageurl2, setImageurl2] = useState()
    const [imageurl3, setImageurl3] = useState()

    async function addRoom() {

        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        }

        try {
            setloading(true)
            const result = await (await axios.post('http://localhost:5000/api/rooms/addroom', newroom)).data
            console.log(result)
            setloading(false)
            Swal.fire({
                icon: 'success',
                title: 'Thêm phòng mới thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then(resrult => {
                window.location.reload()
            });
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Lỗi', "Đã có lỗi xảy ra", 'error')
        }
    }

    return (
        <div className='row'>
            {loading && <Loading />}
            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='Tên Phòng'
                    value={name} onChange={(e) => { setName(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Giá Phòng'
                    value={rentperday} onChange={(e) => { setRentperday(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Số Lượng'
                    value={maxcount} onChange={(e) => { setMaxcount(e.target.value) }}
                />
                <TextArea type='text' className='form-control' placeholder='Mô tả'
                    value={description} onChange={(e) => { setDescription(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Số điện thoại'
                    value={phonenumber} onChange={(e) => { setPhonenumber(e.target.value) }}
                />
            </div>

            <div className='col-md-5'>

                <select className='form-control' value={type} onChange={(e) => { setType(e.target.value) }}>
                    <option ><b>Delux</b></option>
                    <option ><b>Non-Delux</b></option>
                </select>
                <input type='text' className='form-control' placeholder='LinkImg1'
                    value={imageurl1} onChange={(e) => { setImageurl1(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='LinkImg2'
                    value={imageurl2} onChange={(e) => { setImageurl2(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='LinkImg3'
                    value={imageurl3} onChange={(e) => { setImageurl3(e.target.value) }}
                />

                <div className='text-right'>
                    <button className='btn btn-primary' onClick={addRoom}>Thêm Phòng</button>
                </div>
            </div>
        </div>
    )
}