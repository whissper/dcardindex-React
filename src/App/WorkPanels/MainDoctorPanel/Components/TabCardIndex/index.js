import React, { useContext } from 'react';
import './TabCardIndex.css';
import Menu from './Menu';
import Search from './Search';
import TableInfo from './TableInfo';
import Paginator from 'App/WorkPanels/MainDoctorPanel/Components/TabPatients/Paginator';
import TableField from './TableField';
import DeleteCardModal from './DeleteCardModal';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function TabCardIndex(props) {

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        panelData,
        paginatorData,
        printCardHandler,
        cardIndexData,
        cardIndexSearchFieldsData,
        deleteCardModalData,
        chosenCardID
    } = props;

    const handleItemClick = (pageNumber) => {
        mainDoctorPanelDispatch({
            type: 'setPaginators',
            paginators: { tabCardIndexPage: pageNumber }
        });
    };

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
                countRows={cardIndexData.countrows}
                onItemClick={handleItemClick}
                onPrevClick={handleItemClick}
                onNextClick={handleItemClick}
                onFirstClick={handleItemClick}
                onLastClick={handleItemClick} />
            <TableField rowItems={cardIndexData.rowitems} printCard={printCardHandler} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={cardIndexData.perpage}
                countRows={cardIndexData.countrows}
                onItemClick={handleItemClick}
                onPrevClick={handleItemClick}
                onNextClick={handleItemClick}
                onFirstClick={handleItemClick}
                onLastClick={handleItemClick} />
            <br />
            <br />
            <DeleteCardModal data={deleteCardModalData} 
                userData={panelData} 
                chosenCardID={chosenCardID} />
        </React.Fragment>
    );
}

export default TabCardIndex;
