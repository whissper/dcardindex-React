import React from 'react';
import './Menu.css';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

function Menu(props) {

    const { data } = props;

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
                </Row>
            </Col>
        </Row>
    );
}

export default Menu;
