import React from 'react';
import './TableField.css';
import { Table, Badge } from 'react-bootstrap';
import TableRow from './TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';


function TableField(props) {

    const { rowItems } = props;

    const fieldsToValidate = [
        'Сухой вес',
        'Зал',
        'Дата',
        'Время ГД',
        'Подача',
        'Поток ди-та/ф.поток',
        'Доза гепарина',
        'Болюс',
        'Вр. гепарин./оконч',
        'Бикарбонат',
        'Na+',
        'V-уф',
        'Ск.К.',
        'Вес (до ГД)',
        'АД-верх (до ГД)',
        'АД-нижн (до ГД)',
        'Пульс (до ГД)',
        'Вес (после ГД)',
        'АД-верх (после ГД)',
        'АД-нижн (после ГД)',
        'Пульс (после ГД)',
        'KT/V',
        'V перф. крови'
    ];

    const tableRows = rowItems.map((item) => {
        
        let fields = [];

        item.forEach((value, index) => {
            if (index >= 5 && index <= 27) {
                if (value === '') {
                    fields.push(
                        <div key={index.toString()} className="sav2-object-li">
                            <Badge variant="danger">
                                <FontAwesomeIcon icon={faMinusCircle} size="1x" />
                            </Badge>
                            &nbsp;{fieldsToValidate[index-5]}
                            {/* "-5" coz of fieldsToValidate[0..23] but index between 5..27 */}
                        </div>
                    );
                }
            }
        });

        return (
            <TableRow key={(item[0]).toString()}
                cardID={(item[0]).toString()}
                cardDate={item[1]}
                patientID={(item[2]).toString()}
                patientFio={item[3]}
                patientAmbnum={item[4]}
                fields={fields} />
        );
    });

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Дата процедуры</th>
                    <th>Пациент</th>
                    <th>№ амб. карты</th>
                    <th>Поля</th>
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
