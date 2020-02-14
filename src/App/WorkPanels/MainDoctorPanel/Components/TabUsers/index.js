import React, { useContext } from 'react';
import './TabUsers.css';
import Menu from './Menu';
import InsertUserModal from './InsertUserModal';
import Search from './Search';
import TableInfo from './TableInfo';
import Paginator from 'App/WorkPanels/MainDoctorPanel/Components/TabPatients/Paginator';
import TableField from './TableField';
import LockUserModal from './LockUserModal';
import UpdateUserModal from './UpdateUserModal';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function TabUsers(props) {

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        panelData,
        usersData,
        paginatorData,
        usersSearchFieldsData,
        insertUserModalData,
        lockUserModalData,
        updateUserModalData
    } = props;

    const handleItemClick = (pageNumber) => {
        mainDoctorPanelDispatch({
            type: 'setPaginators',
            paginators: { tabUsersPage: pageNumber }
        });
    };
    
    return (
        <React.Fragment>
            <Menu data={panelData} />
            <hr />
            <Search data={usersSearchFieldsData} />
            <hr />
            <TableInfo countRows={usersData.countrows} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={usersData.perpage}
                countRows={usersData.countrows}
                onItemClick={handleItemClick}
                onPrevClick={handleItemClick}
                onNextClick={handleItemClick}
                onFirstClick={handleItemClick}
                onLastClick={handleItemClick} />
            <TableField rowItems={usersData.rowitems} />           
            <hr />
            <Paginator curPage={paginatorData}
                perPage={usersData.perpage}
                countRows={usersData.countrows}
                onItemClick={handleItemClick}
                onPrevClick={handleItemClick}
                onNextClick={handleItemClick}
                onFirstClick={handleItemClick}
                onLastClick={handleItemClick} />
            <br />
            <br />
            <InsertUserModal data={insertUserModalData} />
            <LockUserModal data={lockUserModalData} />
            <UpdateUserModal data={updateUserModalData} />
        </React.Fragment>
    );
}

export default TabUsers;