import React, { useContext } from 'react';
import './Search.css';
import { Row } from 'react-bootstrap';
import SearchItem from './SearchItem';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function Search(props) {

    const { data } = props;

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const doSearch = (searchParams) => {
        /* setSearchFields((prevSearchFields) => (
            { ...prevSearchFields, ...searchParams }
        )); */
        mainDoctorPanelDispatch({
            type: 'setPatientsSearchFields',
            patientsSearchFields: searchParams
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
            <p>Поиск пациентов: </p>
            <Row>
                <SearchItem name="patientID"
                    size={4}
                    label="id пациента:"
                    handleSearch={doSearch}
                    mask={inputmaskData}
                    currentVal={data.patientID} />
                <SearchItem name="patientAmbnum"
                    size={4}
                    label="№ амб. карты:"
                    handleSearch={doSearch}
                    currentVal={data.patientAmbnum} />
                <SearchItem name="patientBirthdate"
                    size={4}
                    label="Дата рождения:"
                    handleSearch={doSearch}
                    mask={datepickerData}
                    currentVal={data.patientBirthdate} />
                <SearchItem name="patientFio"
                    size={8}
                    label="ФИО пациента:"
                    handleSearch={doSearch}
                    currentVal={data.patientFio} />
            </Row>
        </React.Fragment>
    );
}

export default Search;
