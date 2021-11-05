import React from "react";
import {ToastContainer} from "react-toastify";

const Top = () => {
    return (
        <>

            <div className={"topName"}>
                <img height={"30px"} width={"30px"} style={{borderRadius: "20px"}}
                     src={`${process.env.PUBLIC_URL}/logo.jpg`}/> Outdoor Media Management System
            </div>

            <ToastContainer position={"top-center"}/>
        </>
    )
}

export default Top