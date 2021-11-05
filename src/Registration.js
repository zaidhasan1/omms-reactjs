import Navbars from "./Navbars";
import Top from "./Top";
import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap-button-loader';
import axios from 'axios'
import Loader from "./Loader";
import ApiBaseUrl from "./ApiBaseUrl";
import {useAlert} from "react-alert";


const Registration = () => {

    const alert = useAlert();

    const [load, setLoad] = useState(false);
    const [isUserUnique, setIsUserUnique] = useState(false);
    const [isMobileUnique, setIsMobileUnique] = useState(false);
    const [isEmailUnique, setIsEmailUnique] = useState(false);


    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        const role = localStorage.getItem("role");
        if (userId != null) {
            if (role == "admin") {
                window.location.href = "/admin/dashboard"
            } else {
                window.location.href = "/applicant/dashboard"
            }
        }
    }, [])

    const callApi = (e) => {

        e.preventDefault();
        let names = e.target.elements;
        let applicantType = names.applicantType.value;
        let name = names.name.value;
        let username = names.username.value;
        let email = names.email.value;
        let mobile = names.mobile.value;
        let password = names.password.value;

        let data = {
            applicant_type: applicantType,
            applicant_name: name,
            username: username,
            email: email,
            mobile: mobile,
            password: password
        }

        setLoad(true)
        axios.post(`${ApiBaseUrl}applicant/registration`, data).then((res1) => {
            let res = res1.data;
            if (res.ack == 1) {
                alert.success("Welcome, You have done your registration")
                localStorage.setItem("id", res.id);
                localStorage.setItem("role", res.role);
                localStorage.setItem("data", JSON.stringify(res.data))
                window.location.href = "/applicant/dashboard"
            } else {
                alert.error(res.msg);
            }
            setLoad(false)
        }).catch((e) => {
            console.log(e);
            setLoad(false);
        });


    }

    const RegistrationHere = () => {
        return (
            <>
                <br/><br/><br/>
                <div className={"card"}>
                    <div className={"card-body"}>

                        <h4> Registration Here </h4>
                        <hr/>
                        <form onSubmit={(e) => callApi(e)}>
                            <div className={"form-group"}>
                                <label> Applicant Type </label>
                                <select name={"applicantType"} className={"form-control"} required={true}>
                                    <option value="1"> Self Advertiser</option>
                                    <option value={"2"}>Private Property Owner</option>
                                    <option value={"3"}>Advertisement Agency</option>
                                </select>
                            </div>
                            <div className={"form-group"}>
                                <label> Username <small style={{color: "red", fontSize: "12px"}}> (please use only A to
                                    Z , a to z , 0 to 9 or underscore ) </small></label>
                                <input pattern={"[A-Za-z0-9_]+"}
                                       title={"Please use A to Z , a to z , 0 to 9 or underscore "} type={"text"}
                                       name={"username"}
                                       className={"form-control"} required={true}/>
                            </div>
                            <div className={"form-group"}>
                                <label> Name </label>
                                <input type={"text"} name={"name"} className={"form-control"} required={true}/>
                            </div>
                            <div className={"form-group"}>
                                <label> Password </label>
                                <input type={"password"} name={"password"} className={"form-control"} required={true}/>
                            </div>

                            <div className={"form-group"}>
                                <label> Email </label>
                                <input type={"email"} name={"email"} className={"form-control"} required={true}/>
                            </div>

                            <div className={"form-group"}>
                                <label> Mobile </label>
                                <input type={"tel"} maxLength={10} minLength={10} name={"mobile"}
                                       className={"form-control"} required={true}/>
                            </div>

                            <div className={"form-group"} style={{textAlign: "right"}}>
                                <br/>
                                <Button loading={load} style={{marginRight: "10px"}}
                                        className={"btn btn-success"}
                                        type={"submit"}
                                        name={"submit"}>
                                    Register
                                </Button>


                            </div>

                        </form>
                    </div>
                </div>
            </>
        )
    }

    const ShowLoginImage = () => {
        return (
            <>
                <img style={{height: "auto", width: "100%"}} src={`${process.env.PUBLIC_URL}/img/registration.png`}/>
            </>
        )
    }

    return (
        <>
            <Loader isDisplay={load}/>
            <Top/>
            <Navbars/>

            <div className={"container"}>
                <div className={"row"}>

                    <div className={"col-md-5"}>
                        <RegistrationHere/>
                    </div>

                    <div className={"col-md-7"}>
                        <ShowLoginImage/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Registration