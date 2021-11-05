import Top from "../Top";
import Navbars from "../Navbars";
import {useParams} from 'react-router-dom'

const AdminViewEmi = () => {

    const {omd_id} = useParams();
    return (
        <>
            <Top/>
            <Navbars/>
        </>
    )
}

export default AdminViewEmi