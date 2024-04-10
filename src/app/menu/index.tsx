import MenuBar from "./bar";
import { GlobalStateProvider } from "./state";

export default function Menu() {
    return (
        <GlobalStateProvider>
            <MenuBar />
        </GlobalStateProvider>
    );
};
