import React, { useContext, useEffect, useRef } from 'react';
import './DoctorPanel.css';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';
import useMainDoctorPanelReducer from 'App/Utils/useMainDoctorPanelReducer';
import MainMenu from './Components/MainMenu';
import InfoBox from 'App/WorkPanels/MainDoctorPanel/Components/InfoBox';
import TabPatients from 'App/WorkPanels/MainDoctorPanel/Components/TabPatients';
import TabCardIndex from 'App/WorkPanels/MainDoctorPanel/Components/TabCardIndex';
import TabChosenCard from 'App/WorkPanels/MainDoctorPanel/Components/TabChosenCard';
import PrintForm from 'App/WorkPanels/MainDoctorPanel/Components/PrintForm';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';
import { AppDispatch } from 'App/Utils/useAppReducer';

function DoctorPanel(props) {

    const appDispatch = useContext(AppDispatch);

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const { panelData } = props;

    const printFormRef = useRef(null);

    //Reducer -- start:
    const initialState = {
        infoBox: {
            variant: 'info',
            text: '',
            show: false
        },
        panelTabs: {
            showPatientsTab: true,
            showCardIndexTab: false,
            showChosenCardTab: false
        },
        paginators: {
            tabPatientsPage: 1,
            tabCardIndexPage: 1
        },
        printForm: {
            cardID: '', 
            printType: ''
        },
        //TabPatients
        patientsSearchFields: {
            patientID: '',
            patientAmbnum: '',
            patientBirthdate: '',
            patientFio: ''
        },
        patientsData: {
            countrows: 0,
            page: 0,
            perpage: 25,
            rowitems: []
        },
        insertPatientModal: {
            show: false
        },
        updatePatientModal: {
            show: false,
            idVal: '',
            fioVal: '',
            birthdateVal: '',
            heightVal: '',
            ambnumVal: ''
        },
        insertCardModal: {
            show: false,
            patientIDVal: '',
            patientFioVal: ''
        },
        //TabCardIndex
        cardIndexSearchFields: {
            cardID: '',
            patientID: '',
            patientAmbnum: '',
            cardDate: '',
            patientFio: '',
            patientIDIsRed: false
        },
        cardIndexData: {
            countrows: 0,
            page: 0,
            perpage: 25,
            rowitems: []
        },
        deleteCardModal: {
            show: false,
            cardIDVal: ''
        },
        //TabUsers
        
        //TabCardsValidation
        
        //ChosenCard
        chosenCardData : {
            cardID: '',
            entity: 'dcard',
            fields: {}
        },
        updateChosenCardModal: {
            show: false,
            currentFields: {}
        }
    };

    const [state, dispatch] = useMainDoctorPanelReducer(initialState);
    //Reducer -- end;

    const {
        infoBox,    
        panelTabs,
        paginators,
        printForm,
        //TabPatients
        patientsSearchFields,
        patientsData,
        insertPatientModal,
        updatePatientModal,
        insertCardModal,
        //TabCardIndex
        cardIndexSearchFields,
        cardIndexData,
        deleteCardModal,
        //TabUsers
        
        //TabCardsValidation
        
        //ChosenCard
        chosenCardData,
        updateChosenCardModal
    } = state;

    //Patients
    useEffect(() => {
        if (panelTabs.showPatientsTab && 
            !insertPatientModal.show &&
            !updatePatientModal.show) {
            selectPatients();
        }//eslint-disable-next-line
    }, [
        panelTabs.showPatientsTab,
        paginators.tabPatientsPage,
        patientsSearchFields,
        insertPatientModal,
        updatePatientModal
    ]);
    
    //CardIndex
    useEffect(() => {
        if (panelTabs.showCardIndexTab &&
            !deleteCardModal.show) {
            selectCards();
        }//eslint-disable-next-line
    }, [
        panelTabs.showCardIndexTab,
        paginators.tabCardIndexPage,
        cardIndexSearchFields,
        deleteCardModal
    ]);

    //Users
    

    //CardsValidation
    

    const printCard = () => {
        printFormRef.current.submit();
    };
    
    const getActiveTab = () => {
        let activeTab = 'default';

        for (let key in panelTabs) {
            if (panelTabs[key]) {
                activeTab = key;
            }
        }

        const activeTabs = {
            'showPatientsTab':
                <TabPatients panelData={panelData}
                    insertPatientModalData={insertPatientModal}
                    updatePatientModalData={updatePatientModal}
                    insertCardModalData={insertCardModal}
                    paginatorData={paginators.tabPatientsPage}
                    patientsData={patientsData}
                    patientsSearchFieldsData={patientsSearchFields} />,
            'showCardIndexTab': 
                <TabCardIndex panelData={panelData}
                    paginatorData={paginators.tabCardIndexPage}
                    printCardHandler={printCard}
                    cardIndexData={cardIndexData}
                    cardIndexSearchFieldsData={cardIndexSearchFields}
                    deleteCardModalData={deleteCardModal}
                    chosenCardID={chosenCardData.cardID} />,
            'showChosenCardTab': 
                <TabChosenCard panelData={panelData} 
                    chosenCardData={chosenCardData}
                    printCardHandler={printCard}
                    updateChosenCardModalData={updateChosenCardModal} />,
            'default':
                <TabPatients panelData={panelData}
                    insertPatientModalData={insertPatientModal}
                    updatePatientModalData={updatePatientModal}
                    insertCardModalData={insertCardModal}
                    paginatorData={paginators.tabPatientsPage}
                    patientsData={patientsData}
                    patientsSearchFieldsData={patientsSearchFields} />
        }

        return (activeTabs[activeTab] || activeTabs['default']);
        //return activeTabs[activeTab];
    };

    const doSelect = async (selectData) => {
        const textResponse = await fetchData(
            selectData.apiMethod,
            selectData.searchParams,
            ...loadingTriggers
        );

        const response = {
            message: textResponse,
            methodName: selectData.methodName,
            representError: (errorInfo) => {
                dispatch({
                    type: 'setInfoBox',
                    infoBoxData: { variant: 'danger', text: errorInfo, show: true }
                });
            }
        };

        if (!processException(response)) {
            const jsonResponse = JSON.parse(textResponse);
            selectData.processResult(jsonResponse);
        }
    };

    const selectPatients = async () => {
        const searchParams = {
            page:       (paginators.tabPatientsPage - 1),
            id:         patientsSearchFields.patientID,
            ambnum:     patientsSearchFields.patientAmbnum,
            birthdate:  patientsSearchFields.patientBirthdate,
            fio:        patientsSearchFields.patientFio
        };

        const selectData = {
            apiMethod: 'select_patients',
            searchParams: searchParams,
            methodName: 'MainDoctorPanel.selectPatients()',
            processResult: (jsonResponse) => {
                dispatch({
                    type: 'setPatientsData',
                    patientsData: jsonResponse
                });
            }
        };

        await doSelect(selectData);
    };
    
    const selectCards = async () => {
        const searchParams = {
            page:           (paginators.tabCardIndexPage - 1),      
            id:             cardIndexSearchFields.cardID,
            patientid:      cardIndexSearchFields.patientID,        
            patientambnum:  cardIndexSearchFields.patientAmbnum,   
            date:           cardIndexSearchFields.cardDate,
            patientfio:     cardIndexSearchFields.patientFio       
        };

        const selectData = {
            apiMethod: 'select_dcards',
            searchParams: searchParams,
            methodName: 'MainDoctorPanel.selectCards()',
            processResult: (jsonResponse) => {
                dispatch({
                    type: 'setCardIndexData',
                    cardIndexData: jsonResponse
                });
            }
        };

        await doSelect(selectData);
    };

    return (
        <div>
            <MainDoctorPanelDispatch.Provider value={dispatch}>
                <MainMenu data={panelTabs} />
                <br />
                <InfoBox data={infoBox} />
                <br />
                {getActiveTab()}
                <br />
                <PrintForm ref={printFormRef} data={printForm} />
            </MainDoctorPanelDispatch.Provider>
        </div>
    );
}

export default DoctorPanel;
