'use client';

import { useEffect } from "react";

import { MenuState, useMenuState, MenuStateProvider } from "./state";

export let setMenuState: React.Dispatch<React.SetStateAction<MenuState>> = () => {
  throw new Error('');
};

export function Menu(props: MenuState) {
  const context = useMenuState();
  setMenuState = context.setMenuState;

  useEffect(() => {
    setMenuState(() => props);
  }, [props]);

  return null;
}

export { MenuStateProvider };