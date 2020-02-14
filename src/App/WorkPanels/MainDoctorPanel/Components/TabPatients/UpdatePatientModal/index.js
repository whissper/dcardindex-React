import React, { useContext, useRef, useEffect } from 'react';
import './UpdatePatientModal.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Inputmask from 'inputmask';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';
import { AppDispatch } from 'App/Utils/useAppReducer';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function UpdatePatientModal(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { data } = props;

    const fioInput = useRef(null);
    const birthdateInput = useRef(null);
    const heightInput = useRef(null);
    const ambnumInput = useRef(null);

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    //mount datepiker
    useEffect(() => {
        if (data.show) {
            const birthdate = birthdateInput.current;

            window.jQuery(birthdate).datepicker(
                {
                    format: "dd-mm-yyyy",
                    viewMode: "months",
                    minViewMode: "days",
                    language: 'ru'
                }
            );

            return () => {
                window.jQuery(birthdate).datepicker('destroy');
            };
        }
    }, [data.show]);

    //mount inputmask
    useEffect(() => {
        if (data.show) {
            const height = heightInput.current;

            const maskSettings = {
                mask: "9{0,3}[.9{0,2}]",
                greedy: false,
                oncomplete: () => {
                    if (height.value.trim() === '.') {
                        height.value = '0.';
                    }
                },
                onincomplete: () => {
                    if (height.value.trim() === '.') {
                        height.value = '0.';
                    }
                }
            };

            Inputmask(maskSettings).mask(height);

            return () => {
                Inputmask.remove(height);
            };
        }
    }, [data.show]);

    const handleClose = () => {
        mainDoctorPanelDispatch({
            type: 'setUpdatePatientModal',
            updatePatientModalData: { show: false }
        });
    };

    const handleUpdate = async () => {
        const freshPatient = {
            id: data.idVal,
            fio: fioInput.current.value.trim(),
            birthdate: birthdateInput.current.value.trim(),
            height: heightInput.current.value.trim(),
            ambnum: ambnumInput.current.value.trim() 
        };

        const textResponse = await fetchData(
            'update_patient',
            freshPatient,
            ...loadingTriggers
        );

        mainDoctorPanelDispatch({
            type: 'setUpdatePatientModal',
            updatePatientModalData: { show: false }
        });

        const response = {
            message: textResponse,
            methodName: 'UpdatePatientModal.handleUpdate()',
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
                <Modal.Title>Изменение данных пациента</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Данные пациента:</p>
                <Form.Group>
                    <Form.Label>ФИО:</Form.Label>
                    <Form.Control type="text"
                        name="fio"
                        ref={fioInput}
                        defaultValue={data.fioVal}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Дата рождения:</Form.Label>
                    <Form.Control type="text"
                        name="birthdate"
                        ref={birthdateInput}
                        defaultValue={data.birthdateVal}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Рост:</Form.Label>
                    <Form.Control className="no-placeholder" type="text"
                        name="height"
                        ref={heightInput}
                        defaultValue={data.heightVal}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>№ амбулаторной карты:</Form.Label>
                    <Form.Control type="text"
                        name="ambnum"
                        ref={ambnumInput}
                        defaultValue={data.ambnumVal}></Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate}>Сохранить</Button>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdatePatientModal;
