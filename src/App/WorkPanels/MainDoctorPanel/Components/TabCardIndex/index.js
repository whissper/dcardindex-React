import React from 'react';
import './TabCardIndex.css';
import Menu from './Menu';
import Search from './Search';
import TableInfo from './TableInfo';
import Paginator from './Paginator';
import TableField from './TableField';
import DeleteCardModal from './DeleteCardModal';


function TabCardIndex(props) {

    const {
        panelData,
        paginatorData,
        printCardHandler,
        cardIndexData,
        cardIndexSearchFieldsData,
        deleteCardModalData,
        chosenCardID
    } = props;

    return (
        <React.Fragment>
            <Menu data={panelData} />
            <hr />
            <Search data={cardIndexSearchFieldsData} />
            <hr />
            <TableInfo countRows={cardIndexData.countrows} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={cardIndexData.perpage}
                countRows={cardIndexData.countrows} />
            <TableField rowItems={cardIndexData.rowitems} printCard={printCardHandler} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={cardIndexData.perpage}
                countRows={cardIndexData.countrows} />
            <br />
            <br />
            <DeleteCardModal data={deleteCardModalData} 
                userData={panelData} 
                chosenCardID={chosenCardID} />
        </React.Fragment>
    );
}

export default TabCardIndex;
