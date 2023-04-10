import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap';

function Room({ room }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row bs'>
            <div className='col-md-4'>
                <img src={room.imageurls[0]} className='smalling' />
            </div>
            <div className='col-md-7'>
                <h1>{room.name}</h1>
                <b> <p>Số lượng: {room.maxcount}</p>
                    <p>Số điện thoại: {room.phonenumber}</p>
                    <p>Kiểu phòng: {room.type}</p></b>

                <div style={{ float: 'right' }}>
                    <button className='btn btn-primary' onClick={handleShow} > Xem Phòng </button>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel variant="dark">
                        {room.imageurls.map(url => {
                            return <Carousel.Item>
                                <img
                                    className="d-block w-100 biging"
                                    src={url}
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Room
