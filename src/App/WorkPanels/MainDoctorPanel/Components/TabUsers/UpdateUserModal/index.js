import React, { useContext, useRef } from 'react';
import './UpdateUserModal.css';
import { Modal, Button, Form } from 'react-bootstrap';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';
import AppDispatch from 'App/Utils/AppDispatch';
import MainDoctorPanelDispatch from 'App/Utils/MainDoctorPanelDispatch';


function UpdateUserModal(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { data } = props;

    const fioInput = useRef(null);
    const loginInput = useRef(null);
    const passwordInput = useRef(null);

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];   

    const handleClose = () => {
        mainDoctorPanelDispatch({
            type: 'setUpdateUserModal',
            updateUserModalData: { show: false }
        });
    };

    const handleUpdate = async () => {
        const freshUser = {
            id: data.idVal,
            fio: fioInput.current.value.trim(),
            login: loginInput.current.value.trim(),
            pass: passwordInput.current.value,
            firstlogin: 1
        };

        const textResponse = await fetchData(
            'update_user',
            freshUser,
            ...loadingTriggers
        );
        
        mainDoctorPanelDispatch({
            type: 'setUpdateUserModal',
            updateUserModalData: { show: false }
        });

        const response = {
            message: textResponse,
            methodName: 'UpdateUserModal.handleUpdate()',
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
                <Modal.Title>Изменение данных пользователя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Данные пользователя:</p>
                <Form.Group>
                    <Form.Label>ФИО:</Form.Label>
                    <Form.Control type="text"
                        name="fio"
                        ref={fioInput}
                        defaultValue={data.fioVal}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Логин:</Form.Label>
                    <Form.Control type="text"
                        name="login"
                        ref={loginInput}
                        defaultValue={data.loginVal}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control type="password"
                        name="password"
                        ref={passwordInput}></Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate}>Сохранить</Button>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateUserModal;
