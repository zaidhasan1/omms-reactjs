import Top from "../Top";
import Navbars from "../Navbars";
import React, {useEffect, useState} from "react";
import Bottom from "../Bottom";
import {useParams} from 'react-router-dom'
import sha1 from 'sha1'
import Salt from "../Salt";
import {useAlert} from "react-alert";
import axios from "axios";
import ApiBaseUrl from "../ApiBaseUrl";
import Loader from "../Loader";

const OmdDocument = () => {

    const [type, setType] = useState(0);
    const [requireDocument, setRequireDocument] = useState([])
    const [existingDocument, setExistingDocument] = useState([]);
    const alert = useAlert();
    const [load, setLoad] = useState(false);

    const {id, hash, typologyId} = useParams()

    useEffect(() => {
        const newHash = sha1(id + Salt);
        if (newHash != hash) {
            window.location.href = "/404"
        }
    }, [])


    const documentApi = () => {
        setLoad(true)
        axios.post(`${ApiBaseUrl}applicant/getReqDocument`, {
            id: id,
            typology_id: typologyId,
            fors: "OMD"
        }).then((r) => {
            if (r.data.ack == 1) {
                setRequireDocument(r.data.require_document)
                setExistingDocument(r.data.existing_document)
            } else {

            }
            setLoad(false)
        }).catch((e) => {
            setLoad(false)
            console.log(`something went wrong ${e}`)
        })
    }

    useEffect(() => {
        documentApi();
    }, [])


    const callApi = (index) => {

        const number = window.document.getElementById(`number${index}`)
        const file = window.document.getElementById(`file${index}`).files[0];
        const typeId = window.document.getElementById(`typeid${index}`).value

        if (!number.value) {
            alert.error("Please Enter Document Number ")
            number.focus();
        } else if (!file) {
            alert.error("Please Select file ");
        } else {

            let form = new FormData()
            form.append("file", file);
            form.append("number", number.value);
            form.append("omd_id", id);
            form.append("type_id", typeId);

            setLoad(true);
            axios.post(`${ApiBaseUrl}applicant/omdDocumentUpload`, form).then((r) => {
                if (r.data.ack == 1) {
                    alert.success(r.data.msg);
                } else {
                    alert.error(r.data.msg);
                }
                setLoad(false)
                window.location.reload();
            }).catch((e) => {
                setLoad(false)
                console.log(`something went wrong `);
            });

        }
    }


    return (
        <>
            <Loader isDisplay={load}/>
            <Top/>
            <Navbars/>
            <div className={"container"} style={{marginTop: "100px", marginBottom: "150px"}}>
                <div className={"row"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h5>Document</h5>
                            <hr/>
                            {
                                requireDocument.map((v, index) => {
                                    return (
                                        <div key={index}>
                                            <div className={"row"}>

                                                <div className={"col-md-2"}>
                                                    {
                                                        (() => {
                                                            let find = existingDocument.find(({document_typeid}) => document_typeid == v.required_document_id);
                                                            if (find) {
                                                                return <>
                                                                    <img className={"no-image"}
                                                                         src={`${ApiBaseUrl}${find.document_url}`}/>
                                                                </>
                                                            } else {
                                                                return <>
                                                                    <div className={"no-image-css"}/>
                                                                </>
                                                            }
                                                        })()
                                                    }
                                                </div>

                                                <div style={{marginTop: "10px"}} className={"col-md-4"}>
                                                    {v.required_document_title}
                                                </div>
                                                <input type={"hidden"} id={`typeid${index}`}
                                                       value={v.required_document_id}/>
                                                <div style={{marginTop: "10px"}} className={"col-md-2"}>
                                                    <input placeholder={"document No."} id={`number${index}`}
                                                           defaultValue={
                                                               (() => {
                                                                   let find = existingDocument.find(({document_typeid}) => document_typeid == v.required_document_id)
                                                                   if (find) {
                                                                       return find.document_number;
                                                                   }
                                                               })()
                                                           }
                                                           name={"number"} type={"text"}
                                                           className={"form-control"}/>
                                                </div>
                                                <div style={{marginTop: "10px"}} className={"col-md-3"}>
                                                    <input id={`file${index}`} type={"file"}
                                                           className={"form-control"}/>
                                                </div>

                                                <div className={"col-md-1"} style={{marginTop: "10px"}}>
                                                    <button onClick={() => callApi(index)}
                                                            className={"btn btn-success"}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Bottom/>
        </>
    )
}


export default OmdDocument