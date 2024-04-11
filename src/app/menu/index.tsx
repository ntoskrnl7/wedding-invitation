import { ReactNode } from "react";
import MenuBar from "./bar";
import { MenuStateProvider } from "./state";

interface MenuProps {
  children: ReactNode;
}

export default function Menu(props: MenuProps) {
  return (
    <MenuStateProvider>
      <MenuBar />
      {props.children}
    </MenuStateProvider>
  );
};
