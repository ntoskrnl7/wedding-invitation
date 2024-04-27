'use client';

import { useEffect } from "react";

import { MenuState, useMenuState, MenuStateProvider } from "./state";

export let setMenuState: React.Dispatch<React.SetStateAction<MenuState>> = (state) => {
  console.warn(`setMenuState function cannot be called before the AlertMessage component is mounted. ${state}`);
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

export default MenuStateProvider;