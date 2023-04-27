import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRead } from "../Use/useRead";
import { useWrite } from "../Use/useWrite";

export const Global = createContext();

export const GlobalProvider = ({children}) => {

    const [list, setUpdate] = useRead();
    const [response, setCreate, setDelete, setEdit, setEditTax] = useWrite();
    const [route, setRoute] = useState('accounts');
    const [authName, setAuthName] = useState(null);
    const [logged, setLogged] = useState(null);

    useEffect(() => {
        setUpdate(Date.now());
    }, [setUpdate, response]);

    const logOut = _ => {
        axios.post('http://localhost:3003/logout', {}, {withCredentials: true})
        .then(res => {
            setLogged(false);
            setAuthName(false);
        });
    }
    
    return (
        <Global.Provider value={{
            setCreate,
            setEditTax,
            setUpdate,
            setDelete,
            setEdit,
            list,
            //routes
            route, setRoute,
            //auth
            authName, setAuthName, logOut, logged, setLogged
        }}>
            {children}
        </Global.Provider>
    )
}