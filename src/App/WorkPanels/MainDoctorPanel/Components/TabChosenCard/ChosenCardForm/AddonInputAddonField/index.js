import React from 'react';
import './AddonInputAddonField.css';
import { InputGroup } from 'react-bootstrap';


function AddonInputAddonField(props) {

    const { preAddonText, controlElement, postAddonText } = props;

    return (
        <InputGroup size="sm">
            <InputGroup.Prepend>
                <InputGroup.Text>
                    {preAddonText}
                </InputGroup.Text>
            </InputGroup.Prepend>
            {controlElement}
            <InputGroup.Append>
                <InputGroup.Text>
                    {postAddonText}
                </InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
    );
}

export default AddonInputAddonField;
