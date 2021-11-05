import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Top from "../Top";
import Navbars from "../Navbars";

const AdminOmd = (props) => {

    const {string} = useParams();
    const [array, setArray] = useState([]);

    //string will be
    // All , Approved , Decline

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

export default AdminOmd