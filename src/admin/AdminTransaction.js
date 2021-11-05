import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Navbars from "../Navbars";
import Top from "../Top";

const AdminTransaction = () => {

    const [array, setArray] = useState([]);

    const api = () => {

    }

    useEffect(() => {

    }, [])

    return (
        <>
            <Top/>
             <Navbars/>
        </>
    )
}

export default AdminTransaction