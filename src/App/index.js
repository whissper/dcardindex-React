import React, { useEffect } from 'react';
import './App.css';
import TopHeader from 'App/TopHeader';
import Workspace from 'App/Workspace';
import LightCover from 'App/LightCover';
import fetchData from 'App/Utils/fetchData';
import { AppDispatch } from 'App/Utils/useAppReducer';
import useAppReducer from 'App/Utils/useAppReducer';
import processException from 'App/Utils/processException';

//const AppDispatch = React.createContext(null);

function App(props) {

    //Reducer -- start:
    const initialState = {
        isLoad: true,
        panelData: {
            panelID: null,
            userID: '',
            userFIO: ''
        }
    };

    const [state, dispatch] = useAppReducer(initialState);
    //Reducer -- end;

    const { isLoad, panelData } = state;

    const loadingTriggers = [
        () => { dispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { dispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    useEffect(() => {
        keepWorkspace();
        //eslint-disable-next-line
    }, []);

    async function keepWorkspace() {
        const textResponse = await fetchData(
            'keep_workspace',
            { id: '0' },
            ...loadingTriggers
        );

        const response = {
            message: textResponse,
            methodName: 'App.keepWorkspace()'
        };

        if (!processException(response)) {
            const panelDataJSON = JSON.parse(textResponse);
            
            dispatch({
                type: 'setPanelData', 
                panelData: panelDataJSON
            });
        }
    }
    
    return (
        <div>
            <AppDispatch.Provider value={dispatch}>
                <TopHeader />
                <Workspace wsID={panelData.panelID} panelData={panelData} />
                <LightCover isLoading={isLoad} />
            </AppDispatch.Provider>
        </div>
    );

}

export default App;
//export {AppDispatch};
