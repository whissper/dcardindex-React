import React from 'react';
import './TableField.css';
import { Table } from 'react-bootstrap';
import TableRow from './TableRow';


function TableField(props) {

    const { rowItems } = props;

    const tableRows = rowItems.map((item) => (
        <TableRow key={(item[0]).toString()}
            patientID={(item[0]).toString()}
            patientFio={item[1]}
            patientBirthdate={item[2]}
            patientHeight={item[3]}
            patientAmbnum={item[4]} />
    ));

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Дата рождения</th>
                    <th>Рост (см)</th>
                    <th>№ амб. карты</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </Table>
    );
}

export default TableField;
