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
            type: 'setUsersSearchFields',
            usersSearchFields: searchParams
        });
    };

    
    return (
        <React.Fragment>
            <p>Поиск пользователей: </p>
            <Row>
                <SearchItem name="userFio"
                    size={6}
                    label="ФИО пользователя:"
                    handleSearch={doSearch}
                    currentVal={data.userFio} />
            </Row>
        </React.Fragment>
    );
}

export default Search;
