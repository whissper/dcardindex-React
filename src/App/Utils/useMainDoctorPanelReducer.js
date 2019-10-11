import { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'setInfoBox':
            return { ...state, infoBox: action.infoBoxData };
        case 'setPanelTabs':
            return { ...state, panelTabs: action.panelTabs };
        case 'setPaginators':
            return {
                ...state,
                paginators: {
                    ...state.paginators,
                    ...action.paginators
                }
            };
        case 'setPrintForm':
            return {...state, printForm: action.printFormData};
        //Patients
        case 'setPatientsData':
            return { ...state, patientsData: action.patientsData };
        case 'setPatientsSearchFields':
            return {
                ...state,
                patientsSearchFields: {
                    ...state.patientsSearchFields,
                    ...action.patientsSearchFields
                }
            };
        case 'setInsertPatientModal':
            return {
                ...state,
                insertPatientModal: {
                    ...state.insertPatientModal,
                    ...action.insertPatientModalData
                }
            };
        case 'setUpdatePatientModal':
            return {
                ...state,
                updatePatientModal: {
                    ...state.updatePatientModal,
                    ...action.updatePatientModalData
                }
            };
        case 'setInsertCardModal':
            return {
                ...state,
                insertCardModal: {
                    ...state.insertCardModal,
                    ...action.insertCardModalData
                }
            };
        //CardIndex
        case 'setCardIndexData':
            return { ...state, cardIndexData: action.cardIndexData };
        case 'setCardIndexSearchFields':
            return {
                ...state,
                cardIndexSearchFields: {
                    ...state.cardIndexSearchFields,
                    ...action.cardIndexSearchFields
                }
            };
        case 'setDeleteCardModal':
            return {
                ...state,
                deleteCardModal: {
                    ...state.deleteCardModal,
                    ...action.deleteCardModalData
                }
            };
        //Users
        case 'setUsersData':
            return { ...state, usersData: action.usersData };
        case 'setUsersSearchFields':
            return {
                ...state,
                usersSearchFields: {
                    ...state.usersSearchFields,
                    ...action.usersSearchFields
                }
            };
        case 'setInsertUserModal':
            return {
                ...state,
                insertUserModal: {
                    ...state.insertUserModal,
                    ...action.insertUserModalData
                }
            };
        case 'setLockUserModal':
            return {
                ...state,
                lockUserModal: {
                    ...state.lockUserModal,
                    ...action.lockUserModalData
                }
            };
        case 'setUpdateUserModal':
            return {
                ...state,
                updateUserModal: {
                    ...state.updateUserModal,
                    ...action.updateUserModalData
                }
            };
        //CardsValidation
        case 'setCardsValidationData':
            return { ...state, cardsValidationData: action.cardsValidationData };
        //ChosenCard
        case 'setChosenCardData':
            return { 
                ...state, 
                chosenCardData: {
                    ...state.chosenCardData,
                    ...action.chosenCardData 
                }
            };
        case 'setUpdateChosenCardModal':
            return {
                ...state,
                updateChosenCardModal: {
                    ...state.updateChosenCardModal,
                    ...action.updateChosenCardModalData
                }
            };    
        default:
            return state;
    }
}

function useMainDoctorPanelReducer(initialState) {
    return useReducer(reducer, initialState);
}

export default useMainDoctorPanelReducer;
