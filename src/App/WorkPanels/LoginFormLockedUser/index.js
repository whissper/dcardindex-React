import React, { useState, useContext } from 'react';
import './LoginFormLockedUser.css';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import fetchData from 'App/Utils/fetchData';
import { AppDispatch } from 'App/Utils/useAppReducer';
import processException from 'App/Utils/processException';
//import { AppDispatch } from 'App';


function LoginFormLockedUser(props) {
    const appDispatch = useContext(AppDispatch);

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const [credentials, setCredentials] = useState({
        id: 'isuservalid',
        usr: '',
        pwd: '',
        grr: ''
    });

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setCredentials((prevCredentials) => (
            { ...prevCredentials, [name]: value }
        ));
    };

    const handleKeyPress = async (e) => {
        const charCode = e.charCode;
        //'Enter' key is pressed
        if (charCode === 13) {
            const userParams = await doLogin();
            loadWorkspace(userParams);
        }
    };

    const handleClick = async () => {
        const userParams = await doLogin();
        loadWorkspace(userParams);
    };

    async function loadWorkspace(userParams) {
        if (userParams !== null) {
            const data = JSON.parse(userParams);

            if (data.isvalid) {
                const textResponse = await fetchData(
                    'load_workspace',
                    { userid: data.userid, userrole: data.userrole },
                    ...loadingTriggers
                );

                const response = {
                    message: textResponse,
                    methodName: 'LoginForm.loadWorkspace()'
                };

                if (!processException(response)) {
                    const panelDataJSON = JSON.parse(textResponse);
                    
                    appDispatch({
                        type: 'setPanelData', 
                        panelData: panelDataJSON
                    });
                }
            } else {
                appDispatch({ type: 'alertInvalidCredentials' });
            }
        }
    }

    async function doLogin() {
        const textResponse = await fetchData(
            'login',
            credentials,
            ...loadingTriggers
        );

        const response = {
            message: textResponse,
            methodName: 'LoginForm.doLogin()'
        };

        if (!processException(response)) {
            return textResponse;
        } else {
            return null;
        }
    }

    return (
        <Row>
            <Col lg={12}>
                <Alert variant="danger">
                    <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                    &nbsp;Ваша учетная запись заблокирована.
                </Alert>
            </Col>
            <Col lg={12}>
                <Form.Group>
                    <Form.Label>Login:</Form.Label>
                    <Form.Control type="text" name="usr" onChange={handleChange} onKeyPress={handleKeyPress} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="pwd" onChange={handleChange} onKeyPress={handleKeyPress} />
                </Form.Group>
                <Button variant="primary" size="lg" block onClick={handleClick} >Вход</Button>
            </Col>
        </Row>
    );

}

export default LoginFormLockedUser;
