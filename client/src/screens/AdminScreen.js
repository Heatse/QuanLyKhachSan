import React from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;


function AdminScreen() {
    function callback(key) {
        console.log(key);
    }
    return (

        < div className='mt-3 ml-3 mr-3 bs'>

            <h1 className='text-center' style={{ fontSize: '100px' }}><b>Trang quản lý</b></h1>
            <div className='gl' style={{ backgroundColor: 'pink' }}>
                <Tabs Tabs defaultActiveKey='1' onChange={callback}>
                    <TabPane tab="Danh sách đặt phòng" key="1">
                        <Booking />
                    </TabPane>
                    <TabPane tab="Danh sách phòng" key="2">
                        <Room />
                    </TabPane>
                    <TabPane tab="Thêm phòng" key="3">
                        <h1>Thêm</h1>
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
    return (
        <div className='row'>
            <div className='col-md-10'>
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
                    </table>
                </table>
            </div>
        </div>
    )
}

export function Room() {
    return (
        <div className='row'>
            <div className='col-md-10'>
                <table>
                    <table className='table table-bordered'>
                        <thead className='bs'>
                            <tr>
                                <th>Id Phòng</th>
                                <th>Tên Phòng</th>
                                <th>Kiểu phòng</th>
                                <th>Tiền thuê</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                    </table>
                </table>
            </div>
        </div>
    )
}


export function Customer() {
    return (
        <div className='row'>
            <div className='col-md-10'>
                <table>
                    <table className='table table-bordered'>
                        <thead className='bs'>
                            <tr>
                                <th>Id Khách Hàng</th>
                                <th>Email</th>
                                <th>Tên</th>
                            </tr>
                        </thead>
                    </table>
                </table>
            </div>
        </div>
    )
}