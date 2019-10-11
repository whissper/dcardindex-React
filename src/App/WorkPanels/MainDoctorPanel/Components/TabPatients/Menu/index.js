import React, { useContext } from 'react';
import './Menu.css';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import MainDoctorPanelDispatch from 'App/Utils/MainDoctorPanelDispatch';

function Menu(props) {

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { data } = props;

    const handleClick = () => {
        mainDoctorPanelDispatch({
            type: 'setInsertPatientModal',
            insertPatientModalData: { show: true }
        });
    };

    return (
        <Row>
            <Col lg={12}>
                <Row>
                    <Col lg={4}>
                        <InputGroup className="sav2-mb-1">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUserMd} size="1x" />
                                    &nbsp;Сотрудник:
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl disabled value={data.userFIO} />
                        </InputGroup>
                    </Col>
                    <Col lg={4}>
                        <Button onClick={handleClick}>
                            <FontAwesomeIcon icon={faAddressCard} size="1x" />
                            &nbsp;Завести пациента 
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Menu;
