import React, { useContext } from 'react';
import './TableRow.css';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faClipboard } from '@fortawesome/free-regular-svg-icons';
import { AppDispatch } from 'App/Utils/useAppReducer';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';


function TableRow(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        printCard,
        cardID,
        cardDate,
        patientID,
        patientFio,
        patientAmbnum
    } = props;

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const handleDelete = () => {
        mainDoctorPanelDispatch({
            type: 'setDeleteCardModal',
            deleteCardModalData: { 
                show: true,
                cardIDVal: cardID
            }
        });
    };

    const handlePrint = async () => {
        await mainDoctorPanelDispatch({
            type: 'setPrintForm',
            printFormData: {
                cardID: cardID, 
                printType: 3
            }
        });

        printCard();
    };

    const handlePrintI = async () => {
        await mainDoctorPanelDispatch({
            type: 'setPrintForm',
            printFormData: {
                cardID: cardID, 
                printType: 1
            }
        });

        printCard();
    };

    const handlePrintII = async () => {
        await mainDoctorPanelDispatch({
            type: 'setPrintForm',
            printFormData: {
                cardID: cardID, 
                printType: 2
            }
        });

        printCard();
    };

    const handleChoose = async () => {

        const textResponse = await fetchData(
            'select_dcard_by_id',
            { id: cardID },
            ...loadingTriggers
        );

        const response = {
            message: textResponse,
            methodName: 'TabCardIndex.TableField.TableRow.handleChoose()',
            representError: (errorInfo) => {
                mainDoctorPanelDispatch({
                    type: 'setInfoBox',
                    infoBoxData: { variant: 'danger', text: errorInfo, show: true }
                });
            }
        };

        if (!processException(response)) {
            const jsonResponse = JSON.parse(textResponse);
            
            await mainDoctorPanelDispatch({
                type: 'setChosenCardData',
                chosenCardData: {
                    ...jsonResponse,
                    cardID: cardID
                }
            });

            mainDoctorPanelDispatch({
                type: 'setPanelTabs',
                panelTabs: {
                    showPatientsTab: false,
                    showCardIndexTab: false,
                    showChosenCardTab: true,
                    showUsersTab: false,
                    showCardValidationTab: false
                }
            });
        } 
    };

    return (
        <tr>
            <td>{cardID}</td>
            <td>{cardDate}</td>
            <td>
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip id={patientID}>id: {patientID}</Tooltip>}>
                    <span>{patientFio}</span>
                </OverlayTrigger>
            </td>
            <td>{patientAmbnum}</td>
            <td>
                <Button variant="danger" className="sav2-opt-button" onClick={handleDelete} title="Удалить">
                    <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                </Button>
                <Button variant="primary" className="sav2-opt-button" onClick={handlePrintI} title="Печать первой части">
                    <FontAwesomeIcon icon={faFileWord} size="1x" /> I
                </Button>
                <Button variant="primary" className="sav2-opt-button" onClick={handlePrintII} title="Печать второй части">
                    <FontAwesomeIcon icon={faFileWord} size="1x" /> II
                </Button>
                <Button variant="primary" className="sav2-opt-button" onClick={handlePrint} title="Печать всей карты">
                    <FontAwesomeIcon icon={faFileWord} size="1x" />
                </Button>
                <Button variant="success" className="sav2-opt-button" onClick={handleChoose} title="Работа с картой">
                    <FontAwesomeIcon icon={faClipboard} size="1x" />
                </Button>
            </td>
        </tr>
    );
}

export default TableRow;
