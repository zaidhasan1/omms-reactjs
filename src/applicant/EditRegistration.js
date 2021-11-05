import React, {useEffect, useState} from "react";
import Top from "../Top";
import Navbars from "../Navbars";
import Bottom from "../Bottom";
import Loader from "../Loader";
import axios from 'axios'
import ApiBaseUrl from "../ApiBaseUrl";
import {useAlert} from "react-alert";


const EditRegistration = () => {

    const [load, setLoad] = useState(false);
    const id = localStorage.getItem("id");
    const [data, setData] = useState({});

    const [zone, setZone] = useState([]);
    const [ward, setWard] = useState([]);

    const [approveEmail, setApproveEmail] = useState(false);
    const [approveMobile, setApproveMobile] = useState(false);

    const [zoneId, setZoneId] = useState(null)

    const [isApproved, setIsApproved] = useState(false);

    const alert = useAlert();

    const sendMobileLink = () => {
        setLoad(true)
        axios.post(`${ApiBaseUrl}applicant/sendMobileLink`, {
            mobile: data.registration_mobile
        }).then((r) => {
            if (r.data.ack == 1) {
                alert.success(r.data.msg)
            } else {
                alert.error(r.data.msg)
            }
            setLoad(false)
        }).catch((e) => {
            console.log(`something went wrong ${e}`)
            setLoad(false);
        })
    }

    const sendEmailLink = () => {
        setLoad(true)
        axios.post(`${ApiBaseUrl}applicant/sendEmailLink`, {
            email: data.registration_email
        }).then((r) => {
            if (r.data.ack == 1) {
                alert.success(r.data.msg)
            } else {
                alert.error(r.data.msg)
            }
            setLoad(false)
        }).catch((e) => {
            console.log(`something went wrong ${e}`)
            setLoad(false);
        })
    }

    const callEdit = (e) => {

        e.preventDefault();
        let name = e.target.elements;
        let applicantName = name.name.value;
        let address = name.address.value;
        let zoneNo = name.zone.value;
        let wardNo = name.ward.value;
        let pincode = name.pincode.value;
        let adhar = name.adhar.value;
        let pan = name.pan.value;
        let alternateMobile = name.alternate_mobile.value;
        let gst = name.gst.value;
        let agencyName = name.agency_name.value;
        let agencyEmail = name.agency_email.value

        let data = {};
        data.applicant_name = applicantName;
        data.address = address;
        data.zone = zoneNo;
        data.ward = wardNo;
        data.pincode = pincode;
        data.adhar_no = adhar;
        data.pan_no = pan;
        data.alternate_mobile = alternateMobile;
        data.gst = gst;
        data.agency_name = agencyName;
        data.agency_email = agencyEmail;
        data.id = id;

        setLoad(true);
        axios.put(`${ApiBaseUrl}applicant/edit-registration`, data).then((res) => {
            if (res.data.ack == 1) {
                alert.success(res.data.msg);
            } else {
                alert.error(res.data.msg);
            }
            setLoad(false);
        }).catch((e) => {
            setLoad(false);
            console.log("something went wrong with api ")
        })
    }

    const callZone = () => {
        axios.get(`${ApiBaseUrl}applicant/get-zone`).then((res) => {
            if (res.data.ack == 1) {
                setZone(res.data.data);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    useEffect(() => {
        zone.map((v) => {
            if (v.zone_no == data.registration_zone) {
                setZoneId(v.zone_no);
            }
        })
    }, [zone])

    useEffect(() => {
        let z = window.document.getElementById("zone").value;
        let zoneId1 = zoneId == null ? z :  zoneId;
        getWard(zoneId1)
    }, [zoneId])

    const getWard = (zone) => {
        if (zone) {
            axios.post(`${ApiBaseUrl}applicant/get-ward`, {
                zone: zone
            }).then((res) => {
                if (res.data.ack == 1) {
                    setWard(res.data.data);
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    useEffect(() => {
        setIsApproved(data.registration_approved)
    }, [data])

    useEffect(() => {
        callApi();
        callZone()
    }, [])

    const callApi = () => {
        setLoad(true)
        axios.post(`${ApiBaseUrl}applicant/get-registration`, {
            id: id
        }).then((res) => {
            if (res.data.ack == 1) {
                setData(res.data.data);
            }
            setLoad(false);
        }).catch((e) => {
            setLoad(false);
        })
    }

    return (
        <>
            <Loader isDisplay={load}/>
            <Top/>
            <Navbars/>

            <div className={"container"} style={{marginTop: "20px", marginBottom: "100px"}}>
                <div className={"row"}>

                    <h4> Edit Registration </h4>
                    <hr/>
                    <form onSubmit={(e) => callEdit(e)}>

                        <div className={"card"}>
                            <div className={"card-body"}>

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label>Registration No.</label>
                                        <input defaultValue={data.registration_number} className="form-control"
                                               type="text"
                                               disabled/>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Registration User id </label>
                                        <input defaultValue={data.registration_login} className="form-control"
                                               type="text"
                                               disabled/>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Registration Type</label>
                                        <input value={
                                            (() => {
                                                switch (data.registration_type) {
                                                    case "1" :
                                                        return "Self Advertisement ";
                                                    case "2" :
                                                        return "Private Property Owner"
                                                    case "3" :
                                                        return "Advertisement Agency "
                                                    default :
                                                        return "Select type "
                                                }

                                            })()
                                        } className="form-control" type="text"
                                               disabled/>
                                    </div>

                                    <div className="col-md-3">
                                        <label>Mobile Number</label>
                                        <input defaultValue={data.registration_mobile} className="form-control"
                                               type="text" required={true}
                                               id="mobile" disabled/>
                                    </div>

                                    <div className="col-md-3">
                                        <label>Email Address</label>
                                        <input defaultValue={data.registration_email} className="form-control"
                                               type="text" required={true}
                                               id="email" name={"email"} disabled/>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={"row"} style={{marginTop: "30px"}}>
                            <div className={"col-md-2"}>
                                {
                                    data.registration_email_verified == 0 || data.registration_email_verified == null ?
                                        <>
                                            <a onClick={(e) => setApproveEmail(true)} role={"button"}
                                               className={"btn btn-danger btn-sm"}>
                                                Email Not Approve
                                            </a>
                                        </> :
                                        <>
                                            <a role={"button"} className={"btn btn-success btn-sm"}>
                                                Email Has Approved
                                            </a>
                                        </>

                                }
                            </div>
                            <div className={"col-md-2"}>
                                {
                                    data.registration_mobile_verified == 0 || data.registration_mobile_verified == null ?
                                        <>
                                            <a onClick={(e) => setApproveMobile(true)} role={"button"}
                                               className={"btn btn-danger btn-sm"}>
                                                Mobile Not Approve
                                            </a>
                                        </> :
                                        <>
                                            <a role={"button"} className={"btn btn-success btn-sm"}>
                                                Mobile Has Approved
                                            </a>
                                        </>

                                }
                            </div>
                        </div>

                        <div style={{marginTop: "20px"}} className={"card"}>
                            <div className={"card-body"}>

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label>Applicant Name</label>
                                        <input defaultValue={data.registration_applicant_name} className="form-control"
                                               type="text" required={true}
                                               name="name" id="name"
                                        />
                                    </div>
                                </div>


                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label>Applicant Address</label>
                                        <textarea defaultValue={data.registration_address} className="form-control"
                                                  required={true}
                                                  name="address" id="address"
                                                  style={{height: "200px"}}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-4">
                                        <label>Zone No.</label>
                                        <select onChange={(e) => getWard(e.target.value)} className="form-control"
                                                required={true} name="zone"
                                                id="zone">
                                            <option value=""> Select Zones</option>
                                            {
                                                zone.map((v, index) => {

                                                    if (v.zone_no == data.registration_zone) {
                                                        return (
                                                            <>
                                                                <option key={index} selected={true}
                                                                        value={v.zone_no}>{v.zone_no}</option>
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                <option key={index}
                                                                        value={v.zone_no}>{v.zone_no}</option>
                                                            </>
                                                        )
                                                    }
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label>Ward No.</label>
                                        <select className="form-control" required={true} name="ward"
                                                id="ward">
                                            <option value=""> Select Ward</option>
                                            {
                                                ward.map((v, index) => {

                                                    if (v.ward_no == data.registration_ward) {
                                                        return (
                                                            <>
                                                                <option key={index} selected={true}
                                                                        value={v.ward_no}>{v.ward_no}</option>
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                <option key={index}
                                                                        value={v.ward_no}>{v.ward_no}</option>
                                                            </>
                                                        )
                                                    }
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label>Pincode</label>
                                        <input defaultValue={data.registration_pincode} className="form-control"
                                               type="text" required={true}
                                               name="pincode" id="pincode"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-4">
                                        <label>Adhar No.</label>
                                        <input defaultValue={data.registration_adhar} className="form-control"
                                               type="text"
                                               name="adhar" id="adhar"
                                               maxLength="12"/>
                                    </div>
                                    <div className="col-md-4">
                                        <label>PAN No.</label>
                                        <input defaultValue={data.registration_pan} className="form-control" type="text"
                                               name="pan" id="pan"
                                               maxLength="10"/>
                                    </div>
                                    <div className="col-md-4">
                                        <label>Alternate Mobile</label>
                                        <input defaultValue={data.registration_alternate_mobile}
                                               className="form-control" type="text"
                                               name="alternate_mobile" id="alternate_mobile"
                                               maxLength="10"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <label> Enter GST </label>
                                        <input defaultValue={data.registration_gst} required maxLength="15"
                                               minLength="15" type="text" name="gst"
                                               className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"card"} style={{marginTop: "10px"}}>

                            <div className={"card-header"}>
                                <h5><strong>Agency Details</strong></h5>
                            </div>

                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-md-6"}>
                                        <div className={"form-group"}>
                                            <label> Agency Name </label>
                                            <input defaultValue={data.agency_name} type={"text"} name={"agency_name"}
                                                   className={"form-control"}
                                                   required={true}/>
                                        </div>
                                    </div>
                                    <div className={"col-md-6"}>
                                        <div className={"form-group"}>
                                            <label> Agency Email </label>
                                            <input defaultValue={data.agency_email} type={"email"} name={"agency_email"}
                                                   className={"form-control"}
                                                   required={true}/>
                                        </div>
                                    </div>
                                    {
                                        isApproved ? <>
                                            <div className={"col-md-12 text-center "} style={{color: "red"}}><br/>you
                                                cannot make it change after registration approved
                                            </div>
                                        </> : <>
                                            <div className={"col-md-12"} style={{textAlign: "right"}}>
                                                <br/>
                                                <button className={"btn btn-success btn-sm"} type={"submit"}>
                                                    Edit
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </div>


            <Bottom/>
        </>
    )
}

export default EditRegistration