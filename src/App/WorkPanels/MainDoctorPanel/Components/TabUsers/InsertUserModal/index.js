import React, { useContext, useRef } from 'react';
import './InsertUserModal.css';
import { Modal, Button, Form } from 'react-bootstrap';
import MainDoctorPanelDispatch from 'App/Utils/MainDoctorPanelDispatch';
import fetchData from 'App/Utils/fetchData';
import AppDispatch from 'App/Utils/AppDispatch';
import processException from 'App/Utils/processException';

function InsertUserModal(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { data } = props;

    const fioInput = useRef(null);
    const loginInput = useRef(null);
    const passwordInput = useRef(null);
    const roleSelect = useRef(null);
    
    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const handleClose = () => {
        mainDoctorPanelDispatch({
            type: 'setInsertUserModal',
            insertUserModalData: { show: false }
        });
    };

    const handleAdd = async () => {
        const newUser = {
            fio: fioInput.current.value.trim(),
            login: loginInput.current.value.trim(),
            pass: passwordInput.current.value,
            role: roleSelect.current.value
        };
        
        const textResponse = await fetchData(
            'insert_user',
            newUser,
            ...loadingTriggers
        );

        mainDoctorPanelDispatch({
            type: 'setInsertUserModal',
            insertUserModalData: { show: false }
        });

        const response = {
            message: textResponse,
            methodName: 'InsertUserModal.handleAdd()',
            representError: (errorInfo) => {
                mainDoctorPanelDispatch({
                    type: 'setInfoBox',
                    infoBoxData: { variant: 'danger', text: errorInfo, show: true }
                });
            }
        };

        if (!processException(response)) {
            mainDoctorPanelDispatch({
                type: 'setInfoBox',
                infoBoxData: { variant: 'info', text: textResponse, show: true }
            });
        }
    };

    return (
        <Modal show={data.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ввод нового пользователя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Данные пользователя:</p>
                <Form.Group>
                    <Form.Label>ФИО:</Form.Label>
                    <Form.Control type="text" name="fio" ref={fioInput}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Логин:</Form.Label>
                    <Form.Control type="text" name="login" ref={loginInput}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control type="password" name="password" ref={passwordInput}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Роль:</Form.Label>
                    <Form.Control as="select" name="role" ref={roleSelect}>
                        <option value="3">базовые права</option>
                        <option value="1">расширенные права</option>
                    </Form.Control>
                </Form.Group>              
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAdd}>Добавить</Button>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InsertUserModal;
