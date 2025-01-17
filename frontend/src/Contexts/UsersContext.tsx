import React, { createContext, useEffect, ReactNode, useReducer } from 'react';
import { Action, State, UsersContextType, User } from '../Models/UsersModels';

const initialState = {
    users: [] as User[],
    isLoading: false,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'getUsers':
            return { ...state, users: action.payload };
        case 'toggleLoading':
            return { ...state, isLoading: !state.isLoading };
        default:
            throw new Error('unknown action');
    }
}

const UsersContext = createContext<UsersContextType>({
    ...initialState,
    getUsers: async () => {},
    toggleLoading: () => {},
});

const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { users, isLoading } = state;

    async function getUsers() {
        dispatch({ type: 'toggleLoading' });
        try {
            const response = await fetch('http://localhost:8000/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch({ type: 'getUsers', payload: data });
        } catch (err) {
            console.error(err);
        } finally {
            dispatch({ type: 'toggleLoading' });
        }
    }

    function toggleLoading() {
        dispatch({ type: 'toggleLoading' });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ users, isLoading, getUsers, toggleLoading }}>
            {children}
        </UsersContext.Provider>
    );
};

export { UsersContext, UsersProvider };