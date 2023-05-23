import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';


const EditUser = (props) => {

    const { show, handleClose, users } = props

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (users) {
            setEmail(users.email);
            setName(users.name);
            setPassword(users.password);
            setIsAdmin(users.isAdmin);
        }
    }, [users]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleIsAdminChange = (event) => {
        setIsAdmin(event.target.checked);
    };

    const updateUser = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/users/updateuser/${users._id}`, {
                email,
                name,
                password,
                isAdmin
            });
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thông tin người dùng thành công!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(resrult => {
                    window.location.reload()
                });
                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title className='text-center'> Thay đổi thông tin Khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div className="form-group">
                        <label>Tên</label>
                        <input type="text" className="form-control" value={name} onChange={handleNameChange} required />
                    </div>
                    <div className="form-group">
                        <label>Mật Khẩu</label>
                        <input type="text" className="form-control" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" checked={isAdmin} onChange={handleIsAdminChange} />
                        <label className="form-check-label">isAdmin</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={updateUser}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUser



