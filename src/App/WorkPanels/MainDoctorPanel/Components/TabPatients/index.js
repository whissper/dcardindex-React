import React from 'react';
import './TabPatients.css';
import Menu from './Menu';
import Search from './Search';
import TableInfo from './TableInfo';
import Paginator from './Paginator';
import TableField from './TableField';
import InsertPatientModal from './InsertPatientModal';
import InsertCardModal from './InsertCardModal';
import UpdatePatientModal from './UpdatePatientModal';


function TabPatients(props) {

    const {
        panelData,
        insertPatientModalData,
        updatePatientModalData,
        insertCardModalData,
        paginatorData,
        patientsData,
        patientsSearchFieldsData
    } = props;
    
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
                countRows={patientsData.countrows} />
            <TableField rowItems={patientsData.rowitems} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={patientsData.perpage}
                countRows={patientsData.countrows} />
            <br />
            <br />
            <InsertPatientModal data={insertPatientModalData} />
            <InsertCardModal data={insertCardModalData} userData={panelData} />
            <UpdatePatientModal data={updatePatientModalData} />
        </React.Fragment>
    );
}

export default TabPatients;