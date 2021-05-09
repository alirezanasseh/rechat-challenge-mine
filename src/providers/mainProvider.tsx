import React, {createContext, useState} from 'react';
import {IMainProvider} from '../interfaces/provider';

export const MainContext = createContext<IMainProvider>({});

const MainProvider = (props: React.PropsWithChildren<{}>) => {
    let user = localStorage.getItem('user');

    const setValue = (value: object) => {
        setState({...state, ...value});
    };

    const [state, setState] = useState<IMainProvider>({
        user: user ?
            JSON.parse(user)
            :
            {
                id: '1',
                name: 'Alireza Nasseh'
            },
        setValue,
        auth: !!user,
        tasks: [],
        activities: [],
        states: {
            'ToDo': ['InProgress'],
            'InProgress': ['InQA', 'Blocked'],
            'Blocked': ['ToDo'],
            'InQA': ['ToDo', 'Done'],
            'Done': ['Deployed'],
            'Deployed': []
        }
    });

    return (
        <MainContext.Provider value={state}>
            {props.children}
        </MainContext.Provider>
    );
};

export default MainProvider;