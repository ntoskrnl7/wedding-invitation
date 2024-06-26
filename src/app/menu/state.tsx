'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Music } from '../musics'
import MenuBar from './bar';

export interface MenuState {
  opacity: number;
  title: React.JSX.Element;
  music?: Music | undefined;
}

interface MenuStateContextType {
  menuState: MenuState;
  setMenuState: React.Dispatch<React.SetStateAction<MenuState>>;
}

const initialState: MenuState = { title: <></>, opacity: 0.8 };

const MenuStateContext = createContext<MenuStateContextType | undefined>(undefined);

interface MenuStateProviderProps {
  children: ReactNode;
}

export const MenuStateProvider: React.FC<MenuStateProviderProps> = ({ children }) => {
  const [menuState, setMenuState] = useState<MenuState>(initialState);
  return (
    <MenuStateContext.Provider value={{ menuState, setMenuState }}>
      <MenuBar />
      {children}
    </MenuStateContext.Provider>
  );
};

export const useMenuState = () => {
  const context = useContext(MenuStateContext);
  if (context === undefined) {
    throw new Error('useMenuState must be used within a MenuStateProvider');
  }
  return context;
};