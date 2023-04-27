import { useContext } from "react";
import { Global } from "./Global";
import Bank from "./Bank";
import Login from "./Login";
import Auth from "./Auth";
import Home from "./Home";

function Routes() {

    const {route} = useContext(Global);

    switch(route) {
        case 'accounts' : return <Auth><Bank /></Auth>;
        case 'login' : return <Login />;
        case 'home' : return <Home />;
        default : return null;
    }
}

export default Routes;