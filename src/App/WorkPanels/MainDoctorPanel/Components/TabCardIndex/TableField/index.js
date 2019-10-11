import React from 'react';
import './TableField.css';
import { Table } from 'react-bootstrap';
import TableRow from './TableRow';


function TableField(props) {

    const { rowItems, printCard } = props;

    const tableRows = rowItems.map((item) => (
        <TableRow key={(item[0]).toString()} printCard={printCard}
            cardID={(item[0]).toString()}
            cardDate={item[1]}
            patientID={(item[2]).toString()}
            patientFio={item[3]}
            patientAmbnum={item[4]} />
    ));

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Дата процедуры</th>
                    <th>Пациент</th>
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
