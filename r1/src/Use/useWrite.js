import { useEffect, useState } from "react";
import axios from 'axios'
const URL = 'http://localhost:3003/account';
const urlTax = 'http://localhost:3003/tax'

export const useWrite = () => {

    const [response, setResponse] = useState(null);
    const [create, setCreate] = useState(null);
    const [destroy, setDelete] = useState(null);
    const [edit, setEdit] = useState(null);
    const [editTax, setEditTax] = useState(null);

    useEffect(() => {
        if (null === create) {
            return;
        }
        axios.post(URL, create)
            .then(res => setResponse(res.data));

    }, [create]);

    useEffect(() => {
        if (null === destroy) {
            return;
        }
        axios.delete(URL + '/' + destroy.id)
            .then(res => setResponse(res.data));

    }, [destroy]);

    useEffect(() => {
        if (null === edit) {
            return;
        }
        axios.put(URL + '/' + edit.id, edit)
            .then(res => setResponse(res.data));

    }, [edit]);

    useEffect(() => {
        if (null === editTax) {
            return;
        }
        axios.put(urlTax)
            .then(res => setResponse(res.data));

    }, [editTax]);

    return [response, setCreate, setDelete, setEdit, setEditTax];

}