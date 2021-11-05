import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Navbars from "../Navbars";
import Top from "../Top";
import Bottom from "../Bottom";

const steps = [
    'Scrutiny',
    'Competent Authority'
];

const AdminDashboard = () => {

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
                                        <h2> 0 </h2>
                                        <small> Total Registration </small>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <i className={"fa fa-users"}></i>
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
                                        <h2> 0 </h2>
                                        <small> Approved Registration </small>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <i className={"fa fa-users"}></i>
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
                                        <h2> 0 </h2>
                                        <small> Total OMD </small>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <i className={"fa fa-users"}></i>
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
                                        <h2> 0 </h2>
                                        <small> Approved OMD </small>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <i className={"fa fa-users"}></i>
                                    </div>
                                </div>
                            </div>
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
            <div className={"container"} style={{marginTop: "50px", marginBottom: "50px"}}>

                <div className={"row"}>
                    <Counting/>
                    <div style={{marginTop: "10px"}}></div>

                </div>
            </div>

            <Bottom/>
        </>
    )
}

export default AdminDashboard