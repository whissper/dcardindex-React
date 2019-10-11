import React from 'react';
import './CardSection.css';
import { Form, Row, Col } from 'react-bootstrap';


function CardSection(props) {

    const {titleItems, contentItems} = props;

    const items = contentItems.map((item, index) => {
        
        if (titleItems[index] === null) {
            return (
                <Form.Group as={Row} key={index.toString()}>
                    <Col>
                        {item}
                    </Col>
                </Form.Group>
            );
        } else {
            return (
                <Form.Group as={Row} key={index.toString()}>
                    <Form.Label className="sav2-lb-sm" column sm="auto" md="auto" lg="auto">
                        {titleItems[index]}
                    </Form.Label>
                    <Col>
                        {item}
                    </Col>
                </Form.Group>
            );
        }
    });

    return (
        <div className="p-3 border sav2-border-light rounded sav2-dcard-section">
            {items}
        </div>
    );
}

export default CardSection;
