import React, { useContext } from 'react';
import './MainMenu.css';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import fetchData from 'App/Utils/fetchData';
import { AppDispatch } from 'App/Utils/useAppReducer';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';
import processException from 'App/Utils/processException';
//import { AppDispatch } from 'App';

function MainMenu(props) {
    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const { data } = props;

    const logoutIsClicked = async () => {
        const textResponse = await fetchData(
            'logout',
            { id: '0' },
            ...loadingTriggers
        );

        const response = {
            message: textResponse,
            methodName: 'MainDoctorPanel.MainMenu.logoutIsClicked()'
        };

        if (!processException(response)) {
            appDispatch({
                type: 'setPanelData',
                panelData: {
                    panelID: '0',
                    userID: '',
                    userFIO: ''
                }
            });
        }
    };

    const menuButtonIsClicked = (e) => {
        const menuButtonID = e.target.id;

        let freshPanelTabs = {};

        for (let item in data) {
            if (item === menuButtonID) {
                freshPanelTabs[item] = true;
            } else {
                freshPanelTabs[item] = false;
            }
        }
        
        mainDoctorPanelDispatch({
            type: 'setPanelTabs',
            panelTabs: freshPanelTabs
        });
    };

    return (
        <Row>
            <Col lg={12}>
                <ButtonGroup className="flex-wrap">
                    <Button variant="outline-secondary" active={data.showPatientsTab} onClick={menuButtonIsClicked} id="showPatientsTab">Пациенты</Button>
                    <Button variant="outline-secondary" active={data.showCardIndexTab} onClick={menuButtonIsClicked} id="showCardIndexTab">Картотека</Button>
                    <Button variant="outline-secondary" active={data.showChosenCardTab} onClick={menuButtonIsClicked} id="showChosenCardTab">Выбранная карта</Button>
                    <Button variant="primary" onClick={logoutIsClicked} >Выйти</Button>
                </ButtonGroup>
            </Col>
        </Row>
    );
}

export default MainMenu;
