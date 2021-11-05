import Top from "../Top";
import Navbars from "../Navbars";
import Bottom from "../Bottom";
import React, {useEffect, useState} from "react";
import {useAlert} from "react-alert";
import ApiBaseUrl from "../ApiBaseUrl";
import GetSession from "../GetSession";
import axios from 'axios'
import Loader from '../Loader'
import sha1 from 'sha1'
import Salt from "../Salt";


const OmdView = () => {

    const alert = useAlert()
    const [load, setLoad] = useState(false);
    const [omdData, setOmdData] = useState([]);

    const callApi = () => {
        setLoad(true)
        axios.post(`${ApiBaseUrl}applicant/view-omd`, {
            reg_id: GetSession.data.registration_id
        }).then((r) => {
            if (r.data.ack == 1) {
                setOmdData(r.data.data);
            } else {
                alert.error(r.data.msg);
            }
            setLoad(false);
        }).catch((e) => {
            setLoad(false);
            alert.error(`Something went wrong ${e}`);
        })
    }


    useEffect(() => {
        callApi();
    }, [])


    const Jumbotron = () => {
        return (
            <>
                <div className="jumbotron">
                    <h1 className="display-4">No Omd Available </h1>
                    <p className="lead"> No OMD Application found with this user, please Apply OMD First.</p>
                </div>
            </>
        )
    }

    const durationFunc = (duration) => {
        if (duration < 12) {
            return `${duration} Month`
        } else if (duration == 12) {
            return `1 Year`
        } else if (duration == 24) {
            return `2 Years`
        } else if (duration == 36) {
            return `3 Years`
        }
    }

    return (
        <>
            <Loader isDisplay={load}/>
            <Top/>
            <Navbars/>
            <div className={"container"} style={{marginTop: "100px", marginBottom: "150px", minHeight: "500px"}}>
                <div className={"row"}>
                    <h5>OMD Application</h5>
                    <hr/>
                    <div className={"row"}>
                        {
                            omdData.length ? omdData.map((v) => {
                                return (
                                    <>
                                        <div className={"col-md-6"}>
                                            <div className={"card"} style={{padding:"30px"}}>
                                                <div className={"card-body"}>
                                                    <h4><span
                                                        style={{color: "red"}}>{v.omd_typology_name} For {durationFunc(v.duration)}</span>
                                                    </h4>
                                                    <hr/>
                                                    <table className={"table table-striped"}>
                                                        <tbody>
                                                        <tr>
                                                            <th>Address</th>
                                                            <td>{v.address}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Size</th>
                                                            <td> {v.width} ft (W) x {v.height} ft (H) x {v.sided} (Side)</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Total Area</th>
                                                            <td>{v.total_area} Sq.Ft </td>
                                                        </tr>

                                                        <tr>
                                                            <th>Illumination</th>
                                                            <td>{v.illumination}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Illumination Desc</th>
                                                            <td>{v.illumination_des == null ? "No Illimination Description" : v.illumination_des} </td>
                                                        </tr>

                                                        <tr>
                                                            <th>Scrutiny</th>
                                                            <td>{v.scrutiny_status == 0 ? <span style={{color : "red"}}> Not Approved</span> : <span style={{color : "green"}}> Approved</span>}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Zonal Officer</th>
                                                            <td>{v.zonal_status == 0 ? <span style={{color : "red"}}> Not Approved</span> : <span style={{color : "green"}}> Approved</span>}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Assistant Engineer</th>
                                                            <td>{v.ae_status == 0 ? <span style={{color : "red"}}> Not Approved</span> : <span style={{color : "green"}}> Approved</span>}</td>
                                                        </tr>

                                                        <tr>
                                                            <th> Competent Authority</th>
                                                            <td>{v.competent_status == 0 ? <span style={{color : "red"}}> Not Approved</span> : <span style={{color : "green"}}> Approved</span>}</td>
                                                        </tr>

                                                        <tr>
                                                            <th> Processing Fee</th>
                                                            <th>
                                                                {v.processing_fee_txn == 0 ? <button
                                                                        className={"btn btn-danger btn-sm"}> Pay </button> :
                                                                    <span style={{color:"green"}}> Paid </span>}
                                                            </th>
                                                        </tr>
                                                        </tbody>
                                                        <tfoot>
                                                        <tr>
                                                            <td colSpan={2}>

                                                              <a href={`/applicant/omd-document/${v.typology_id}/${v.id}/${sha1(v.id+Salt)}`} className={"btn btn-success btn-sm"} style={{marginLeft:"10px",marginTop:"10px"}}>
                                                                  Add Document
                                                              </a>

                                                                <a href={`/applicant/omd-view/${v.id}/${sha1(v.id+Salt)}`} className={"btn btn-success btn-sm"}  style={{marginLeft:"10px",marginTop:"10px"}}>
                                                                    View Omd
                                                                </a>
                                                                <a className={"btn btn-sm btn-success"}  style={{marginLeft:"10px",marginTop:"10px"}}>
                                                                    View EMI
                                                                </a>

                                                            </td>
                                                        </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }) : <Jumbotron/>
                        }
                    </div>
                </div>
            </div>

            <Bottom/>
        </>
    )
}

export default OmdView