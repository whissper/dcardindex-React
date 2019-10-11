import React, { useContext } from 'react';
import './Search.css';
import { Row } from 'react-bootstrap';
import SearchItem from './SearchItem';
import MainDoctorPanelDispatch from 'App/Utils/MainDoctorPanelDispatch';


function Search(props) {

    const { data } = props;

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const doSearch = (searchParams) => {
        mainDoctorPanelDispatch({
            type: 'setCardIndexSearchFields',
            cardIndexSearchFields: searchParams
        });
    };

    const inputmaskData = {
        type: "inputmask",
        params: { mask: "9{0,}", greedy: false }
    };

    const datepickerData = {
        type: "datepicker",
        params: {
            format: "dd-mm-yyyy",
            viewMode: "months",
            minViewMode: "days",
            language: 'ru'
        }
    };

    return (
        <React.Fragment>
            <p>Поиск карт: </p>
            <Row>
                <SearchItem name="cardID"
                    size={3}
                    label="id карты:"
                    handleSearch={doSearch}
                    mask={inputmaskData}
                    currentVal={data.cardID} />
                <SearchItem name="patientID"
                    size={3}
                    label="id пациента:"
                    handleSearch={doSearch}
                    mask={inputmaskData}
                    currentVal={data.patientID}
                    isRed={data.patientIDIsRed} />
                <SearchItem name="patientAmbnum"
                    size={6}
                    label="№ амб. карты пациента:"
                    handleSearch={doSearch}
                    currentVal={data.patientAmbnum} />
                <SearchItem name="cardDate"
                    size={6}
                    label="Дата процедуры:"
                    handleSearch={doSearch}
                    mask={datepickerData}
                    currentVal={data.cardDate} />
                <SearchItem name="patientFio"
                    size={6}
                    label="ФИО пациента:"
                    handleSearch={doSearch}
                    currentVal={data.patientFio} />
            </Row>
        </React.Fragment>
    );
}

export default Search;
