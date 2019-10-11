import React from 'react';
import './TabChosenCard.css';
import Menu from './Menu';
import ChosenCardForm from './ChosenCardForm';
import UpdateChosenCardModal from './UpdateChosenCardModal';


function TabChosenCard(props) {

    const {
        panelData,
        chosenCardData,
        printCardHandler,
        updateChosenCardModalData
    } = props;

    return(
        <React.Fragment>
            <Menu data={panelData} cardID={chosenCardData.cardID} printCard={printCardHandler} />
            <hr />
            <ChosenCardForm data={chosenCardData} />
            <br />
            <br />
            <UpdateChosenCardModal 
                cardID={chosenCardData.cardID} 
                data={updateChosenCardModalData} 
                prevFields={chosenCardData.fields}
                userData={panelData} />
        </React.Fragment>
    );
}

export default TabChosenCard;
