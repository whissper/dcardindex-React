import React, { useContext } from 'react';
import './TableRow.css';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import AppDispatch from 'App/Utils/AppDispatch';
import MainDoctorPanelDispatch from 'App/Utils/MainDoctorPanelDispatch';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';


function TableRow(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        userID,
        userLocked,
        userFio
    } = props; 

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const handleUpdate = async () => {

        const textResponse = await fetchData(
            'select_user_by_id',
            { id: userID },
            ...loadingTriggers
        );

        const response = {
            message: textResponse,
            methodName: 'TabUsers.TableField.TableRow.handleUpdate()',
            representError: (errorInfo) => {
                mainDoctorPanelDispatch({
                    type: 'setInfoBox',
                    infoBoxData: { variant: 'danger', text: errorInfo, show: true }
                });
            }
        };

        if (!processException(response)) {
            const jsonResponse = JSON.parse(textResponse);
            
            mainDoctorPanelDispatch({
                type: 'setUpdateUserModal',
                updateUserModalData: { 
                    show: true,
                    idVal: jsonResponse.fields.idUpd,
                    fioVal: jsonResponse.fields.fioUserUpd,
                    loginVal: jsonResponse.fields.loginUserUpd 
                }
            });
        }      
    };

    const handleLockUnlock = () => {
        mainDoctorPanelDispatch({
            type: 'setLockUserModal',
            lockUserModalData: { 
                show: true,
                userID: userID,
                userFio: userFio,
                userLocked: userLocked
            }
        });
    };

    const overlayText = (userLocked === 0 ? 
        'Разблокирован. Нажмите чтобы заблокировать' : 
        'Заблокирован. Нажмите чтобы разблокировать'
    );

    return (
        <tr>
            <td>{userFio}</td>
            <td style={{textAlign: "right"}}>
                <Button variant="success" 
                    className="sav2-opt-button" 
                    title="Изменить данные учетной записи" 
                    onClick={handleUpdate}>
                        <FontAwesomeIcon icon={faIdCard} size="1x" />
                </Button>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={userID}>{overlayText}</Tooltip>}>
                        <Button variant={(userLocked === 0 ? "info" : "warning")} 
                            className="sav2-opt-button"  
                            onClick={handleLockUnlock}>
                                <FontAwesomeIcon icon={(userLocked === 0 ? faLockOpen : faLock)} size="1x" />
                        </Button>
                </OverlayTrigger>
            </td>
        </tr>
    );
}

export default TableRow;
