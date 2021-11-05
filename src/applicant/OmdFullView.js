import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import sha1 from "sha1";
import Salt from "../Salt";
import Navbars from "../Navbars";
import Top from "../Top";
import Loader from "../Loader";
import Bottom from "../Bottom";
import axios from 'axios'
import ApiBaseUrl from "../ApiBaseUrl";
import {useAlert} from "react-alert";

const moment = require("moment")

const OmdFullView = () => {

    const {id, hash} = useParams(); //omd_id
    const [load, setLoad] = useState(false)
    const alert = useAlert();
    const [data, setData] = useState({});
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        const newHash = sha1(id + Salt);
        if (newHash != hash) {
            window.location.href = "/404"
        }
    }, [])

    const callApi = () => {
        setLoad(true)
        axios.post(`${ApiBaseUrl}applicant/view-full-omd`, {
            id: id
        }).then((r) => {
            if (r.data.ack == 1) {
                setData(r.data.data);
                setDocuments(r.data.data.documents || [])
            }
            setLoad(false);
        }).catch((e) => {
            console.log(e);
            setLoad(false);
        })
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

    useEffect(() => {
        callApi()
    }, [])


    return (
        <>
            <Loader isDisplay={load}/>
            <Top/>
            <Navbars/>
            <div className={"container"} style={{minHeight: "500px"}}>
                <div className={"card"} style={{marginTop: "50px"}}>
                    <div className={"card-body"}>
                        <h5> OMD Details </h5>
                        <hr/>
                        <table className={"table table-striped"}>
                            <tbody>
                            <tr>
                                <th colSpan={6}>
                                    OMD Details
                                </th>
                            </tr>
                            <tr>
                                <td> Unique ID</td>
                                <th> {data.omd_uniqueid}</th>
                                <td> Zone</td>
                                <th> {data.zone}</th>
                                <td> Ward</td>
                                <th>{data.ward}</th>
                            </tr>
                            <tr>
                                <td> Pincode</td>
                                <th> {data.pincode} </th>
                                <td> Latitude</td>
                                <th> {data.latitude == null ? 0 : data.latitude}</th>
                                <td> Longitude</td>
                                <th>{data.longitude == null ? 0 : data.longitude}</th>
                            </tr>
                            <tr>
                                <td> Address</td>
                                <th colSpan={5}> {data.address}</th>
                            </tr>
                            <tr>
                                <td> Description</td>
                                <th colSpan={5}> {data.description}</th>
                            </tr>
                            <tr>
                                <td> Typology</td>
                                <th> {data.typology_name} - {data.typology_desc}</th>
                                <td> Typology Sub-category</td>
                                <th> {data.sub_category_name == null ? "No-Subcateogry" : data.sub_category_name} </th>
                                <td> Installation Type</td>
                                <th> {data.installation_type}</th>
                            </tr>

                            <tr>
                                <td> Width</td>
                                <th> {data.width}</th>
                                <td> Height</td>
                                <th> {data.height} </th>
                                <td> Sides</td>
                                <th> {data.sides == 1 ? "Single" : "Double"}</th>
                            </tr>

                            <tr>
                                <td> Total Area</td>
                                <th> {data.total_area} Sq.Ft</th>
                                <td> Illumination</td>
                                <th> {data.illumination} </th>
                                <td> Illumination Desc</td>
                                <th> {data.illumination_des == null ? "No Description" : data.illumination_des}</th>
                            </tr>

                            <tr>
                                <td> Format</td>
                                <th> {data.format == 2 ? "Unipole" : data.format == 3 ? "Roof Top" : null} </th>
                                <td> Duration</td>
                                <th colSpan={3}> {durationFunc(data.duration)} </th>
                            </tr>

                            <tr>
                                <td> Scrutiny Status</td>
                                <th>
                                    {data.scrutiny_status == 0 ? <span style={{color: "red"}}> Not Approved</span> :
                                        <span style={{color: "green"}}> Approved</span>}
                                </th>
                                <td> Zonal Status</td>
                                <th>
                                    {data.zonal_status == 0 ? <span style={{color: "red"}}> Not Approved</span> :
                                        <span style={{color: "green"}}> Approved</span>}
                                </th>
                                <td> Assistant Engineer</td>
                                <th>
                                    {data.ae_status == 0 ? <span style={{color: "red"}}> Not Approved</span> :
                                        <span style={{color: "green"}}> Approved</span>}
                                </th>
                            </tr>
                            <tr>
                                <td> Competent Authority</td>
                                <th>
                                    {data.competent_status == 0 ? <span style={{color: "red"}}> Not Approved</span> :
                                        <span style={{color: "green"}}> Approved</span>}
                                </th>
                                <td> Progressing Fee</td>
                                <th>
                                    {data.processing_fee_txn == 0 ? "No TXN-ID" : data.processing_fee_txn}
                                </th>
                                <td>Omd Register Time</td>
                                <th> {moment(data.datetime).calendar()}</th>
                            </tr>
                            </tbody>
                        </table>

                        <table className={"table table-striped"}>
                            <tbody>
                            <tr>
                                <th colSpan={2}> Documents</th>
                            </tr>
                            <tr>
                                <th> Number</th>
                                <th> Document</th>
                            </tr>
                            {
                                documents.map((v,index) => {
                                    return (
                                        <>
                                            <tr>
                                                <th>{index + 1}</th>
                                                <th>{v.required_document_title}</th>
                                                <th>
                                                    <img height={"200px"} width={"150px"} style={{borderRadius: "10px"}}
                                                         src={`${ApiBaseUrl}${v.document_url}`}/>
                                                </th>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Bottom/>
        </>
    )
}

export default OmdFullView