import React, {useEffect, useState} from "react";
import Top from "../Top";
import Navbars from "../Navbars";
import Bottom from "../Bottom";
import axios from "axios";
import ApiBaseUrl from "../ApiBaseUrl";
import Loader from "../Loader";
import {useAlert} from "react-alert";
import GetSession from "../GetSession";

const AddOmd = () => {

    const [zone, setZone] = useState([]);
    const [ward, setWard] = useState([]);
    const [omdTypology, setOmdTyplogy] = useState([]);
    const [omdSubTypology, setOmdSubTypology] = useState([]);
    const [durationArr, setDurationArr] = useState([])
    const [load, setLoad] = useState(false);
    const alert = useAlert();

    const [isIllumination, setIsIllumination] = useState(false);

    const [typologyId, setTypologyId] = useState(0);
    const [subTypologyId, setSubTypologyId] = useState(0);
    const [omdFormat, setOmdFormat] = useState(null);
    const [installationType, setInstallationType] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sided, setSided] = useState(0);
    const [illumination, setIllumination] = useState(0);
    const [illuminationDescription, setIlluminationDescription] = useState(null)
    const [address, setAddress] = useState(null)
    const [zoneId, setZoneId] = useState(0);
    const [wardId, setWardId] = useState(0);
    const [pincode, setPincode] = useState(0);
    const [description, setDescription] = useState("")

    const [isSubTypology, setIsSubTypology] = useState(false);

    useEffect(() => {
        callTypology();
        callZone()
    }, [])

    const callApi = (e) => {

        e.preventDefault();
        setLoad(true)

        const typologyIds = typologyId.split("<=>")[0];

        const data = {};
        data.typology_id = typologyIds;
        data.sub_typology_id = subTypologyId;
        data.omd_format = omdFormat;
        data.installation_type = installationType;
        data.width = width;
        data.height = height;
        data.duration = duration;
        data.sided = sided;
        data.illumination = illumination;
        data.illumination_description = illuminationDescription;
        data.address = address;
        data.zone = zoneId;
        data.ward  = wardId;
        data.pincode = pincode;
        data.reg_id = GetSession.data.registration_id;
        data.description = description

        axios.post(`${ApiBaseUrl}applicant/applyOmdApplication`, data).then((r) => {
            setLoad(false);
            if (r.data.ack == 1) {
                alert.success(r.data.msg);
                window.location.href="/applicant/view-omd"
            } else {
                alert.error(r.data.msg)
            }
            console.log(r.data);
        }).catch((e) => {
            console.log(e);
            setLoad(false)
        })
    }

    const callTypology = () => {
        setIsSubTypology(false);
        setLoad(true)
        axios.get(`${ApiBaseUrl}applicant/omdTypology`).then((r) => {
            r.data.ack == 1 ? setOmdTyplogy(r.data.data) : alert.error(r.data.msg);
            setLoad(false);
        }).catch((e) => {
            setLoad(false)
        })
    }

    const callSubTypology = (typologyId) => {
        setLoad(true)
        setTypologyId(typologyId)
        axios.post(`${ApiBaseUrl}applicant/omdSubTypology`, {
            typology_id: typologyId
        }).then((r) => {
            console.log(r.data)
            if (r.data.ack == 1) {
                setOmdSubTypology(r.data.data)
                setIsSubTypology(true)
            }
            setLoad(false);
        }).catch((e) => {
            setLoad(false)
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

    const putDuration = (e) => {
        let value = e.target.value;
        let typologyGroup = value.split("<=>")[1];
        let du = [];
        if (typologyGroup == "D" || typologyGroup == "G" || typologyGroup == "J") {
            du.push({
                id: 36,
                duration: "3 Year"
            });
            setDurationArr(du);
        } else {
            for (let i = 1; i <= 11; i++) {
                du.push({
                    id: i,
                    duration: `${i} Month`
                });
            }
            du.push({
                id: 12,
                duration: "1 Year"
            });
            du.push({
                id: 24,
                duration: "2 Year"
            });
            du.push({
                id: 36,
                duration: "3 Year"
            });
            setDurationArr(du);
        }
    }

    const multipleTypologyFunction = (e) => {
        callSubTypology(e.target.value);
        putDuration(e);
    }

    return (
        <>
            <Loader isDisplay={load}/>
            <Top/>
            <Navbars/>
            <div className={"container"} style={{marginTop: "50px", marginBottom: "100px"}}>
                <div className={"row"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h4> OMD Application </h4>
                            <hr/>
                            <form className="form-horizontal" onSubmit={(e) => callApi(e)} method="post">
                                <div className="form-group row">
                                    <div className="col-md-3">
                                        <label>License Typology </label>
                                        <select onChange={(e) => multipleTypologyFunction(e)}
                                                className="form-control" required={true} name="typology"
                                                id="typology">
                                            <option value=""> Please Select ...</option>
                                            {
                                                omdTypology.map((v) => {
                                                    return <>
                                                        <option
                                                            value={`${v.omd_typology_id}<=>${v.omd_typology_group}`}>{v.omd_typology_name} ({v.omd_typology_description.substring(0, 60)})
                                                        </option>
                                                    </>
                                                })
                                            }
                                        </select>
                                    </div>

                                    {
                                        isSubTypology ? <>
                                            <div className="col-md-3">
                                                <label>License Typology Sub Category</label>
                                                <select onChange={(e) => setSubTypologyId(e.target.value)}
                                                        className="form-control" required={true} name="subcategory"
                                                        id="subcategory">
                                                    <option value={""}>Please Select....</option>
                                                    {
                                                        omdSubTypology.map((v) => {
                                                            return <>
                                                                <option
                                                                    value={v.omd_subcategory_id}> {v.omd_subcategory_name}
                                                                </option>
                                                            </>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </> : null
                                    }


                                    <div className="col-md-3">
                                        <label>OMD Format</label>
                                        <select onChange={(e) => setOmdFormat(e.target.value)} className="form-control"
                                                required={true} name="format"
                                                id="format">
                                            <option value={""}>Please Select....</option>
                                            <option value="2">Uni Pole</option>
                                            <option value="3">Roof Top</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Installation Type</label>
                                        <select onChange={(e) => setInstallationType(e.target.value)}
                                                className="form-control" required={true} name="installation_type"
                                                id="installation_type">
                                            <option value={""}>Please Select....</option>
                                            <option value="On-Ground">On Ground</option>
                                            <option value="On-Structure">On Structure</option>
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label>OMD Width (in Feet) </label>
                                        <input onChange={(e) => setWidth(e.target.value)} className="form-control"
                                               type="number" step={1} required={true} name="width"
                                               id="omd_app_width"/>
                                    </div>
                                    <div className="col-md-3">
                                        <label>OMD Height (in Feet)</label>
                                        <input step={1} onChange={(e) => setHeight(e.target.value)}
                                               className="form-control"
                                               type="number" required={true} name="height"
                                               id="omd_app_height"/>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Duration</label>
                                        <select onChange={(e) => setDuration(e.target.value)} className="form-control"
                                                name="duration" id="duration">
                                            <option value=""> Select Please ...</option>
                                            {
                                                durationArr.map((v) => {
                                                    return (
                                                        <>
                                                            <option value={v.id}>{v.duration}</option>
                                                        </>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label>Is the Sign Single or Double Sided</label>
                                        <select onChange={(e) => setSided(e.target.value)} className="form-control"
                                                required={true} name="sided"
                                                id="installation_type">
                                            <option value={""}>Please Select....</option>
                                            <option value={"1"}>Single</option>
                                            <option value={"2"}>Double</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Illumination Applied</label>
                                        <select onChange={(e) => {
                                            setIllumination(e.target.value);
                                            e.target.value == 1 ? setIsIllumination(true) : setIsIllumination(false)
                                        }} name={"illumination"} required={true} className={"form-control"}>
                                            <option value={""}>Please Select....</option>
                                            <option value={0}>No</option>
                                            <option value={1}>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                {
                                    isIllumination ? <>
                                        <div className="form-group row">
                                            <div className="col-md-12">
                                                <label>Describe Illumination</label>
                                                <textarea onChange={(e) => setIlluminationDescription(e.target.value)}
                                                          style={{height: "200px"}} required={true}
                                                          className="form-control" type="text"
                                                          name="illumination_des"
                                                          id="illumination_des"></textarea>
                                            </div>
                                        </div>
                                    </> : null
                                }

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label>Address where OMD installed</label>
                                        <textarea style={{height: "200px"}} onChange={(e) => setAddress(e.target.value)}
                                                  className="form-control"
                                                  type="text" name="address"
                                                  id="address"></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-4">
                                        <label>Zone No.</label>
                                        <select onChange={(e) => {
                                            setZoneId(e.target.value);
                                            getWard(e.target.value);
                                        }} className="form-control"
                                                required={true} name="zone"
                                                id="zone">
                                            <option value=""> Please Select ...</option>
                                            {
                                                zone.map((v) => {
                                                    return <>
                                                        <option value={v.zone_no}>{v.zone_no}</option>
                                                    </>
                                                })
                                            }

                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label>Ward No.</label>
                                        <select onChange={(e) => setWardId(e.target.value)} className="form-control"
                                                required={true} name="ward"
                                                id="ward">
                                            <option value=""> Please Select ...</option>
                                            {
                                                ward.map((v) => {
                                                    return <>
                                                        <option value={v.ward_no}>{v.ward_no}</option>
                                                    </>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label>Pincode</label>
                                        <input onChange={(e) => setPincode(e.target.value)} className="form-control"
                                               type="text" required={true} name="pincode"
                                               maxLength={6}
                                               minLength={6}
                                               id="pincode"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label>Describe Position on the Site / Property</label>
                                        <textarea onChange={(e) => setDescription(e.target.value)}
                                                  style={{height: "200px"}} className="form-control" name="description"
                                                  id="description"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className={"form-group"} style={{textAlign: "right"}}>
                                    <br/>
                                    <button type={"submit"} className={"btn btn-success"}>
                                        Apply OMD
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Bottom/>
        </>
    )
}

export default AddOmd