import React, { useContext } from 'react';
import './Menu.css';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faFileWord } from '@fortawesome/free-solid-svg-icons';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';

function Menu(props) {

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { 
        data,
        cardID,
        printCard
    } = props;

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

    const buttonActive = (
        cardID !== '' && 
        cardID !== null &&
        cardID !== 0
    );

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
                        <Button disabled={!buttonActive} 
                            variant="primary" 
                            onClick={handlePrintI} title="Печать первой части">
                                <FontAwesomeIcon icon={faFileWord} size="1x" /> I
                        </Button>
                        &nbsp;&nbsp;
                        <Button disabled={!buttonActive}
                            variant="primary" 
                            onClick={handlePrintII} title="Печать второй части">
                                <FontAwesomeIcon icon={faFileWord} size="1x" /> II
                        </Button>
                        &nbsp;&nbsp;
                        <Button disabled={!buttonActive}
                            variant="primary" 
                            onClick={handlePrint} title="Печать всей карты">
                                <FontAwesomeIcon icon={faFileWord} size="1x" /> I+II
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Menu;
