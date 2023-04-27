import axios from "axios";
import { useContext, useEffect} from "react";
import { Global } from "./Global";
import Home from "./Home";
import Loader from "./Loader";

function Auth({children}) {

    const {setAuthName, logged, setLogged} = useContext(Global);

    useEffect(() => {
        axios.get('http://localhost:3003/login', {withCredentials: true})
        .then(res => {
            if(res.data.status === 'ok'){
                setLogged(true);
                setAuthName(res.data.name);
            } else {
                setLogged(false);
                setAuthName(null);
            }
        });
    }, []);

    if (logged === null) {
        return <Loader />
    }
    if (logged === true){
        return (
            <>
            {children}
            </>
        )
    }

    if (logged === false){
        return (
            <Home />
        )
    }
}

export default Auth;