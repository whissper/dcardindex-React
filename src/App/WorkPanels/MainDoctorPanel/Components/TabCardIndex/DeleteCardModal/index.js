import React, { useContext } from 'react';
import './DeleteCardModal.css';
import { Modal, Button } from 'react-bootstrap';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';
import makeFixedFormat from 'App/Utils/makeFixedFormat';
import AppDispatch from 'App/Utils/AppDispatch';
import MainDoctorPanelDispatch from 'App/Utils/MainDoctorPanelDispatch';


function DeleteCardModal(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { data, userData, chosenCardID } = props;

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const handleClose = () => {
        mainDoctorPanelDispatch({
            type: 'setDeleteCardModal',
            deleteCardModalData: { show: false }
        });
    };

    const handleDelete = async () => {
        const currentdate = new Date();
        const datetime = "deletion timestamp: "
            + makeFixedFormat(currentdate.getDate()) + "-"
            + makeFixedFormat((currentdate.getMonth() + 1)) + "-"
            + currentdate.getFullYear() + " @ "
            + makeFixedFormat(currentdate.getHours()) + ":"
            + makeFixedFormat(currentdate.getMinutes()) + ":"
            + makeFixedFormat(currentdate.getSeconds());

        const changelogVal = '|' + datetime + ' by ' + userData.userFIO + ' (id:' + userData.userID + ')';

        const textResponse = await fetchData(
            'delete_dcard',
            { id: data.cardIDVal, changelog: changelogVal },
            ...loadingTriggers
        );

        mainDoctorPanelDispatch({
            type: 'setDeleteCardModal',
            deleteCardModalData: { show: false }
        });

        const response = {
            message: textResponse,
            methodName: 'TabCardIndex.TableRow.handleDelete()',
            representError: (errorInfo) => {
                mainDoctorPanelDispatch({
                    type: 'setInfoBox',
                    infoBoxData: { variant: 'danger', text: errorInfo, show: true }
                });
            }
        };

        if (!processException(response)) {
            //clear current chosen Card (if it was deleted)
            if (data.cardIDVal === chosenCardID) {
                await mainDoctorPanelDispatch({
                    type: 'setChosenCardData',
                    chosenCardData: {
                        cardID: '',
                        fields: {}
                    }
                });
            }

            mainDoctorPanelDispatch({
                type: 'setInfoBox',
                infoBoxData: { variant: 'success', text: textResponse, show: true }
            });
        }
    };

    return (
        <Modal show={data.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Удаление диализной карты</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Удалить данную карту под номером id: {data.cardIDVal}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleDelete}>Удалить</Button>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteCardModal;
