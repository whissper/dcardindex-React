import React, { useContext } from 'react';
import './LockUserModal.css';
import { Modal, Button } from 'react-bootstrap';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';
import { AppDispatch } from 'App/Utils/useAppReducer';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function LockUserModal(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { data } = props;

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const handleClose = () => {
        mainDoctorPanelDispatch({
            type: 'setLockUserModal',
            lockUserModalData: { show: false }
        });
    };

    const handleLockUnlock = async () => {
        const apiMethod = (data.userLocked === 0 ? 'lock_user' : 'unlock_user');

        const textResponse = await fetchData(
            apiMethod,
            { id: data.userID },
            ...loadingTriggers
        );

        mainDoctorPanelDispatch({
            type: 'setLockUserModal',
            lockUserModalData: { show: false }
        });

        const response = {
            message: textResponse,
            methodName: 'LockUserModal.handleLock()',
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

    const titleVal = (data.userLocked === 0 ?
        'Блокировка пользователя' :
        'Разблокировка пользователя'    
    );

    const textVal = (data.userLocked === 0 ?
        'Блокировать пользователя: ' + data.userFio :
        'Разблокировать пользователя: ' + data.userFio
    );

    return (
        <Modal show={data.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{titleVal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{textVal}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleLockUnlock}>
                    {(data.userLocked === 0 ? "Заблокировать" : "Разблокировать")}
                </Button>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LockUserModal;
