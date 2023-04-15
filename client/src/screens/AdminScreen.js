import React from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;


function AdminScreen() {
    function callback(key) {
        console.log(key);
    }
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h1 className='text-center' style={{ fontSize: '100px' }}><b>Trang quản lý</b></h1>
            <Tabs defaultActiveKey='1' onChange={callback}>
                <TabPane tab="Danh sách đặt phòng" key="1">
                    <Booking />
                </TabPane>
                <TabPane tab="Danh sách phòng" key="2">
                    <h1>Phòng</h1>
                </TabPane>
                <TabPane tab="Thêm phòng" key="3">
                    <h1>Thêm</h1>
                </TabPane>
                <TabPane tab="Khách hàng" key="4">
                    <h1>Khách hàng</h1>
                </TabPane>
            </Tabs>,
        </div>
    )
}

export default AdminScreen


export function Booking() {
    // const [booking, setBooking] = useState([])
    // const [loading, setloading] = useState(true)
    // const [error, seterror] = useState()

    // useEffect(async () => {
    //     try {
    //         const data = await (await axios.post(""))
    //     } catch (error) {

    //     }
    // })

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Booking</h1>
            </div>
        </div>
    )
}