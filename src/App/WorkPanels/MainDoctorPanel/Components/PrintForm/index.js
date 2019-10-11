import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import './PrintForm.css';
import { REST_SERVICE_URL } from 'App/Utils/fetchData';

function ForwardedPrintForm(props, ref) {

    const formRef = useRef(null);

    const { data } = props;

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current.submit();
        }
    }));

    return (
        <form ref={formRef} method="post" target="_blank" action={ REST_SERVICE_URL+"print_dcard/" }>
            <input name="id" hidden readOnly value={data.cardID} />
            <input name="printtype" hidden readOnly value={data.printType} />
        </form>
    );
}

const PrintForm = forwardRef(ForwardedPrintForm);

export default PrintForm;
