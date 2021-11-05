import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Top from "../Top";
import Navbars from "../Navbars";

const AdminOmdDetails = () => {


    const {omd_id} = useParams();
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

export default AdminOmdDetails