import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextArea from 'antd/es/input/TextArea';
import Swal from 'sweetalert2';
import axios from 'axios';


const EditRoom = (props) => {

    const { show, handleClose, room } = props

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        rentperday: '',
        maxcount: '',
        phonenumber: '',
        description: '',
        imageurls: ['', '', '']
    });

    useEffect(() => {
        if (room) {
            setFormData({
                name: room.name,
                type: room.type,
                rentperday: room.rentperday,
                maxcount: room.maxcount,
                phonenumber: room.phonenumber,
                description: room.description,
                imageurls: room.imageurls,

            });
        }
    }, [room]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Check if the input field is for an image url
        if (name.startsWith("imageurls")) {
            // Get the index of the image url in the array
            const index = Number(name.match(/\[(\d+)\]/)[1]);

            // Update the corresponding element in the imageurls array
            setFormData((prevFormData) => {
                const newImageUrls = [...prevFormData.imageurls];
                newImageUrls[index] = value;
                return { ...prevFormData, imageurls: newImageUrls };
            });
        } else {
            // If it's not an image url input, update the state normally
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        }
    };

    const updateRoom = () => {

        axios.put(`http://localhost:5000/api/rooms/updateroom/${room._id}`, formData)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thông tin phòng thành công!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(resrult => {
                    window.location.reload()
                });
                handleClose();
            })
            .catch((err) => {
                Swal.fire('Error', 'Sửa thông tin phòng không thất bại', 'error');
            });
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} className="custom-modal" >
                <Modal.Header >
                    <Modal.Title className='text-center'> Thay đổi thông tin phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='row'>
                        <div className='col-md-7'>
                            <div>
                                <label>Mô tả:</label>
                                <TextArea type="text" className='input-group' name="description" value={formData.description} onChange={handleInputChange} />
                            </div>
                            <div>
                                {formData.imageurls.map((url, index) => (
                                    <div key={index}>
                                        <label>Link {index + 1}:</label>
                                        <input type="text" className='input-group' name={`imageurls[${index}]`} value={url} onChange={handleInputChange} />
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className='col-md-5'>
                            <div>
                                <label>Tên Phòng:</label>
                                <input type="text" className='input-group' name="name" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Kiểu Phòng:</label>
                                <select type="text" className='input-group' name="type" value={formData.type} onChange={handleInputChange}>
                                    <option ><b>Delux</b></option>
                                    <option ><b>Non-Delux</b></option>
                                </select>
                            </div>
                            <div>
                                <label>Giá Thuê:</label>
                                <input type="text" className='input-group' name="rentperday" value={formData.rentperday} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Số Lượng:</label>
                                <input type="text" className='input-group' name="maxcount" value={formData.maxcount} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Phone Number:</label>
                                <input type="text" className='input-group' name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} />
                            </div>
                        </div>


                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={updateRoom}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditRoom



