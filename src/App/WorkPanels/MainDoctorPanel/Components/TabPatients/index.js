import React, { useContext } from 'react';
import './TabPatients.css';
import Menu from './Menu';
import Search from './Search';
import TableInfo from './TableInfo';
import Paginator from './Paginator';
import TableField from './TableField';
import InsertPatientModal from './InsertPatientModal';
import InsertCardModal from './InsertCardModal';
import UpdatePatientModal from './UpdatePatientModal';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function TabPatients(props) {

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        panelData,
        insertPatientModalData,
        updatePatientModalData,
        insertCardModalData,
        paginatorData,
        patientsData,
        patientsSearchFieldsData
    } = props;

    const handleItemClick = (pageNumber) => {
        mainDoctorPanelDispatch({
            type: 'setPaginators',
            paginators: { tabPatientsPage: pageNumber }
        });
    };
    
    return (
        <React.Fragment>
            <Menu data={panelData} />
            <hr />
            <Search data={patientsSearchFieldsData} />
            <hr />
            <TableInfo countRows={patientsData.countrows} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={patientsData.perpage}
                countRows={patientsData.countrows}
                onItemClick={handleItemClick}
                onPrevClick={handleItemClick}
                onNextClick={handleItemClick}
                onFirstClick={handleItemClick}
                onLastClick={handleItemClick} />
            <TableField rowItems={patientsData.rowitems} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={patientsData.perpage}
                countRows={patientsData.countrows}
                onItemClick={handleItemClick}
                onPrevClick={handleItemClick}
                onNextClick={handleItemClick}
                onFirstClick={handleItemClick}
                onLastClick={handleItemClick} />
            <br />
            <br />
            <InsertPatientModal data={insertPatientModalData} />
            <InsertCardModal data={insertCardModalData} userData={panelData} />
            <UpdatePatientModal data={updatePatientModalData} />
        </React.Fragment>
    );
}

export default TabPatients;