import React, { useContext } from 'react';
import './TableRow.css';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faFileMedical, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function TableRow(props) {

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        patientID,
        patientFio,
        patientBirthdate,
        patientHeight,
        patientAmbnum
    } = props; 

    const handleUpdateClick = () => {
        //no need to fetch data from 'select_patient_by_id'
        mainDoctorPanelDispatch({
            type: 'setUpdatePatientModal',
            updatePatientModalData: { 
                show: true,
                idVal: patientID, 
                fioVal: patientFio,
                birthdateVal: patientBirthdate,
                heightVal: patientHeight,
                ambnumVal: patientAmbnum
            }
        });
    };

    const handleInsertNewCard = () => {
        mainDoctorPanelDispatch({
            type: 'setInsertCardModal',
            insertCardModalData: {
                show: true,
                patientIDVal: patientID,
                patientFioVal: patientFio
            }
        });
    };

    const handleSelectCurrentCards = async () => {  

        await mainDoctorPanelDispatch({
            type: 'setCardIndexSearchFields',
            cardIndexSearchFields: { 
                patientID: patientID,
                patientIDIsRed: true
            }
        });

        await mainDoctorPanelDispatch({
            type: 'setPaginators',
            paginators: { tabCardIndexPage: 1 }
        });

        mainDoctorPanelDispatch({
            type: 'setPanelTabs',
            panelTabs: {
                showPatientsTab: false,
                showCardIndexTab: true,
                showChosenCardTab: false,
                showUsersTab: false,
                showCardValidationTab: false
            }
        });
    };

    return (
        <tr>
            <td>
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip id={patientID}>id: {patientID}</Tooltip>}>
                    <span>{patientFio}</span>
                </OverlayTrigger>
            </td>
            <td>{patientBirthdate}</td>
            <td>{patientHeight}</td>
            <td>{patientAmbnum}</td>
            <td>
                <Button variant="success" 
                    className="sav2-opt-button" 
                    title="Изменить данные" 
                    onClick={handleUpdateClick}>
                        <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                </Button>
                <Button variant="success" 
                    className="sav2-opt-button" 
                    title="Завести карту"
                    onClick={handleInsertNewCard}>
                        <FontAwesomeIcon icon={faFileMedical} size="1x" />
                </Button>
                <Button variant="info" 
                    className="sav2-opt-button" 
                    title="Просмотр текущих карт"
                    onClick={handleSelectCurrentCards}>
                        <FontAwesomeIcon icon={faArrowRight} size="1x" />
                </Button>
            </td>
        </tr>
    );
}

export default TableRow;
