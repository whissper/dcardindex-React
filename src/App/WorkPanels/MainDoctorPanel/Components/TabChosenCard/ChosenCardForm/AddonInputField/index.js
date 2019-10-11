import React from 'react';
import './AddonInputField.css';
import { InputGroup } from 'react-bootstrap';


function AddonInputField(props) {

    const { addonText, controlElement } = props;

    return (
        <InputGroup size="sm">
            <InputGroup.Prepend>
                <InputGroup.Text>
                    {addonText}
                </InputGroup.Text>
            </InputGroup.Prepend>
            {controlElement}
        </InputGroup>
    );
}

export default AddonInputField;
