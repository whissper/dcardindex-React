import React, { useContext, useRef, useEffect } from 'react';
import './InsertCardModal.css';
import { Modal, Button, Form } from 'react-bootstrap';
import MainDoctorPanelDispatch from 'App/Utils/MainDoctorPanelDispatch';
import fetchData from 'App/Utils/fetchData';
import AppDispatch from 'App/Utils/AppDispatch';
import processException from 'App/Utils/processException';
import makeFixedFormat from 'App/Utils/makeFixedFormat';


function InsertCardModal(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { data, userData } = props;

    const cardDateInput = useRef(null);
    const dProcedureIDSelect = useRef(null);

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    //mount datepiker
    useEffect(() => {
        if (data.show) {
            const cardDate = cardDateInput.current;

            window.jQuery(cardDate).datepicker(
                {
                    format: "dd-mm-yyyy",
                    viewMode: "months",
                    minViewMode: "days",
                    language: 'ru'
                }
            );
            
            window.jQuery(cardDate).datepicker('update', new Date());

            return () => {
                window.jQuery(cardDate).datepicker('destroy');
            };
        }
    }, [data.show]);

    const handleClose = () => {
        mainDoctorPanelDispatch({
            type: 'setInsertCardModal',
            insertCardModalData: { show: false }
        });
    };

    const handleAdd = async () => {
        const currentdate = new Date(); 

        const datetime = "creation timestamp: " 
            + makeFixedFormat( currentdate.getDate() ) + "-"
            + makeFixedFormat( (currentdate.getMonth()+1) )  + "-" 
            + currentdate.getFullYear() + " @ "  
            + makeFixedFormat( currentdate.getHours() ) + ":"  
            + makeFixedFormat( currentdate.getMinutes() ) + ":" 
            + makeFixedFormat( currentdate.getSeconds() );

        const changelogVal = ''+ datetime +' by '+ userData.userFIO +' (id:'+ userData.userID +')';

        const newCard = {
            patientid: data.patientIDVal,
            date: cardDateInput.current.value.trim(),
            dprocedureid: dProcedureIDSelect.current.value,
            changelog: changelogVal
        };

        const textResponse = await fetchData(
            'insert_dcard',
            newCard,
            ...loadingTriggers
        );

        mainDoctorPanelDispatch({
            type: 'setInsertCardModal',
            insertCardModalData: { show: false }
        });

        const response = {
            message: textResponse,
            methodName: 'InsertCardModal.handleAdd()',
            representError: (errorInfo) => {
                mainDoctorPanelDispatch({
                    type: 'setInfoBox',
                    infoBoxData: { variant: 'danger', text: errorInfo, show: true }
                });
            }
        };

        if (!processException(response)) {
                       
            await mainDoctorPanelDispatch({
                type: 'setCardIndexSearchFields',
                cardIndexSearchFields: { 
                    patientID: data.patientIDVal,
                    patientIDIsRed: true
                }
            });

            await mainDoctorPanelDispatch({
                type: 'setPaginators',
                paginators: { tabCardIndexPage: 1 }
            });

            await mainDoctorPanelDispatch({
                type: 'setPanelTabs',
                panelTabs: {
                    showPatientsTab: false,
                    showCardIndexTab: true,
                    showChosenCardTab: false,
                    showUsersTab: false,
                    showCardValidationTab: false
                }
            });
    
            mainDoctorPanelDispatch({
                type: 'setInfoBox',
                infoBoxData: { variant: 'info', text: textResponse, show: true }
            });
        }
    };

    return (
        <Modal show={data.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Создание диализной карты</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Данные по карте:</p>
                <Form.Group>
                    <Form.Label>id пациента:</Form.Label>
                    <Form.Control type="text" name="patientid" readOnly value={data.patientIDVal}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ФИО пациента:</Form.Label>
                    <Form.Control type="text" name="patientfio" readOnly value={data.patientFioVal}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Дата процедуры:</Form.Label>
                    <Form.Control type="text" name="carddate" ref={cardDateInput}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Вид процедуры:</Form.Label>
                    <Form.Control as="select" name="dprocedureid" ref={dProcedureIDSelect}>
                        <option value="1">ГД</option>
                        <option value="2">ГДФ</option>
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

export default InsertCardModal;
