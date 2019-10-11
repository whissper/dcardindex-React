import React from 'react';
import './Workspace.css';
import { Container } from 'react-bootstrap';
import LoginFormLockedUser from 'App/WorkPanels/LoginFormLockedUser';
import LoginForm from 'App/WorkPanels/LoginForm';
import DoctorPanel from 'App/WorkPanels/DoctorPanel';
import MainDoctorPanel from 'App/WorkPanels/MainDoctorPanel';
import CreatePasswordForm from 'App/WorkPanels/CreatePasswordForm';


function Workspace(props) {

    const { wsID, panelData } = props;

    const getWorkPanel = (ID) => {
        switch (ID) {
            case '-2':
                return <CreatePasswordForm panelData={panelData} />;
            case '-1':
                return <LoginFormLockedUser />; 
            case '0':
                return <LoginForm />;
            case '1':
                return <MainDoctorPanel panelData={panelData} />;
            case '3':
                return <DoctorPanel panelData={panelData} />;
            default:
                return null;
        }
    }
    
    return (
        <Container className="sav2-main-cont">
            {getWorkPanel(wsID)}
        </Container>
    );

}

export default Workspace;
