import React, { useContext } from 'react';
import './TableRow.css';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { AppDispatch } from 'App/Utils/useAppReducer';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';


function TableRow(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        cardID,
        cardDate,
        patientID,
        patientFio,
        patientAmbnum,
        fields
    } = props;

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const handleChoose = async () => {

        const textResponse = await fetchData(
            'select_dcard_by_id',
            { id: cardID },
            ...loadingTriggers
        );

        const response = {
            message: textResponse,
            methodName: 'TabCardsValidation.TableField.TableRow.handleChoose()',
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
            <td>{fields}</td>
            <td>
                <Button variant="success" className="sav2-opt-button" onClick={handleChoose} title="Работа с картой">
                    <FontAwesomeIcon icon={faClipboard} size="1x" />
                </Button>
            </td>
        </tr>
    );
}

export default TableRow;
