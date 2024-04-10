'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface GlobalState {
    title: React.JSX.Element;
}

interface GlobalStateContextType {
    globalState: GlobalState;
    setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const initialState: GlobalState = { title: <></> };

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

interface GlobalStateProviderProps {
    children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
    const [globalState, setGlobalState] = useState<GlobalState>(initialState);

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// 전역 상태를 사용하기 위한 커스텀 훅
export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};