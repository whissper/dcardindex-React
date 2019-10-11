import React from 'react';
import './TabUsers.css';
import Menu from './Menu';
import InsertUserModal from './InsertUserModal';
import Search from './Search';
import TableInfo from './TableInfo';
import Paginator from './Paginator';
import TableField from './TableField';
import LockUserModal from './LockUserModal';
import UpdateUserModal from './UpdateUserModal';


function TabUsers(props) {

    const {
        panelData,
        usersData,
        paginatorData,
        usersSearchFieldsData,
        insertUserModalData,
        lockUserModalData,
        updateUserModalData
    } = props;
    
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
                countRows={usersData.countrows} />
            <TableField rowItems={usersData.rowitems} />           
            <hr />
            <Paginator curPage={paginatorData}
                perPage={usersData.perpage}
                countRows={usersData.countrows} />
            <br />
            <br />
            <InsertUserModal data={insertUserModalData} />
            <LockUserModal data={lockUserModalData} />
            <UpdateUserModal data={updateUserModalData} />
        </React.Fragment>
    );
}

export default TabUsers;