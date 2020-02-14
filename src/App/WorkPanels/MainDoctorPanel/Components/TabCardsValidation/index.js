import React, { useContext } from 'react';
import './TabCardsValidation.css';
import Menu from './Menu';
import TableInfo from './TableInfo';
import Paginator from 'App/WorkPanels/MainDoctorPanel/Components/TabPatients/Paginator';
import TableField from './TableField';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function TabCardsValidation(props) {

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        panelData,
        cardsValidationData,
        paginatorData,
    } = props;
    
    const handleItemClick = (pageNumber) => {
        mainDoctorPanelDispatch({
            type: 'setPaginators',
            paginators: { tabCardsValidationPage: pageNumber }
        });
    };

    return (
        <React.Fragment>
            <Menu data={panelData} />
            <hr />
            <TableInfo countRows={cardsValidationData.countrows} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={cardsValidationData.perpage}
                countRows={cardsValidationData.countrows}
                onItemClick={handleItemClick}
                onPrevClick={handleItemClick}
                onNextClick={handleItemClick}
                onFirstClick={handleItemClick}
                onLastClick={handleItemClick} />
            <TableField rowItems={cardsValidationData.rowitems} />           
            <hr />
            <Paginator curPage={paginatorData}
                perPage={cardsValidationData.perpage}
                countRows={cardsValidationData.countrows}
                onItemClick={handleItemClick}
                onPrevClick={handleItemClick}
                onNextClick={handleItemClick}
                onFirstClick={handleItemClick}
                onLastClick={handleItemClick} />
            <br />
            <br />
        </React.Fragment>
    );
}

export default TabCardsValidation;