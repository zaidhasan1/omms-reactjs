import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Navbars from "../Navbars";
import Top from "../Top";
import Bottom from "../Bottom";
import ApiBaseUrl from "../ApiBaseUrl";
import axios from 'axios'
import ReactPlayer from "react-player";

const steps = [
    'Scrutiny',
    'Competent Authority'
];

const Dashboard = () => {

    const [allRegistration, setAllRegistration] = useState(0)
    const [allApproveRegistration, setAllApproveRegistration] = useState(0)
    const [allOmd, setAllOmd] = useState(0);
    const [allApproveOmd, setApproveOmd] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        callApi();
    }, [])

    const callApi = () => {
        setLoad(true)
        axios.get(`${ApiBaseUrl}applicant/getAllCount`).then((r) => {
            setLoad(false);
            setAllRegistration(r.data.all_registration);
            setAllApproveRegistration(r.data.all_approve_registration);
            setAllOmd(r.data.all_omd);
            setApproveOmd(r.data.all_approve_omd);
        }).catch((e) => {
            setLoad(false);
        })
    }

    const RegistrationProgression = () => {

        return (
            <>
                <div className={"row"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h5> Registration Status.</h5>
                            <hr/>
                            <Box sx={{width: '100%'}}>
                                <Stepper activeStep={1} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </div>
                    </div>
                </div>
            </>
        )

    }

    const Counting = () => {
        return (
            <>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-md-10"}>
                                        <h2> {allRegistration} </h2>
                                        <small> Total Registration </small>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <i className={"fa fa-users"} style={{color: "#007aaf", fontSize: "30px"}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"col-md-3"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-md-10"}>
                                        <h2> {allApproveRegistration} </h2>
                                        <small> Approved Registration </small>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <i className={"fa fa-users"} style={{color: "#007aaf", fontSize: "30px"}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"col-md-3"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-md-10"}>
                                        <h2> {allOmd} </h2>
                                        <small> Total OMD </small>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <i className={"fa fa-users"} style={{color: "#007aaf", fontSize: "30px"}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"col-md-3"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-md-10"}>
                                        <h2> {allApproveOmd} </h2>
                                        <small> Approved OMD </small>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <i className={"fa fa-users"} style={{color: "#007aaf", fontSize: "30px"}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const Messages = () => {
        return (
            <>
                <div className={"card"} style={{height: "400px", width: "100%"}}>
                    <div className={"card-body"}>
                        <h5> Messages </h5>
                    </div>
                </div>
            </>
        )
    }

    const SideBar = () => {
        return (
            <>
            </>
        );
    }

    const TutorialVideo = () => {
        return (
            <>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <h5> You don't know how to use it , please see video below <i
                            className={"fa fa-arrow-down"}/></h5>
                        <div className={"row"}>

                            <ReactPlayer
                                height={"500px"}
                                width={"100%"}
                                url={"https://www.youtube.com/watch?v=sr1NBjMNF5w"}/>
                        </div>

                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <Top/>
            <Navbars/>
            <div className={"container"} style={{marginTop: "50px", marginBottom: "50px", minHeight: "600px"}}>

                <div className={"col-md-12"}>
                    <Counting/>

                    <div style={{marginTop: "10px"}}></div>
                    <hr/>
                    <Messages/>
                    <hr/>
                    <TutorialVideo/>
                </div>
            </div>

            <Bottom/>
        </>
    )
}

export default Dashboard