import React from 'react';
import './TabCardsValidation.css';
import Menu from './Menu';
import TableInfo from './TableInfo';
import Paginator from './Paginator';
import TableField from './TableField';


function TabCardsValidation(props) {

    const {
        panelData,
        cardsValidationData,
        paginatorData,
    } = props;
    
    return (
        <React.Fragment>
            <Menu data={panelData} />
            <hr />
            <TableInfo countRows={cardsValidationData.countrows} />
            <hr />
            <Paginator curPage={paginatorData}
                perPage={cardsValidationData.perpage}
                countRows={cardsValidationData.countrows} />
            <TableField rowItems={cardsValidationData.rowitems} />           
            <hr />
            <Paginator curPage={paginatorData}
                perPage={cardsValidationData.perpage}
                countRows={cardsValidationData.countrows} />
            <br />
            <br />
        </React.Fragment>
    );
}

export default TabCardsValidation;