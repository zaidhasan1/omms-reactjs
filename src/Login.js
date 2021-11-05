import Navbars from "./Navbars";
import Top from "./Top";
import React, {useState} from "react";
import Bottom from "./Bottom";
import {useAlert} from "react-alert";
import Loader from "./Loader";
import ApiBaseUrl from "./ApiBaseUrl";
import axios from 'axios'

const Login = () => {

    const [load, setLoad] = useState(false);
    const alert = useAlert();

    const callApi = (e) => {

        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        setLoad(true)
        axios.post(`${ApiBaseUrl}applicant/login`, {
            username: username,
            password: password
        }).then((r) => {
            if (r.data.ack == 1) {
                localStorage.setItem("role", "user");
                localStorage.setItem("id", r.data.id);
                localStorage.setItem("data", JSON.stringify(r.data.data));
                window.location.href = "/applicant/dashboard"
                alert.success("Login Successfully ");
            } else {
                alert.error(r.data.msg);
            }
            setLoad(false);
        }).catch((e) => {
            console.log("something went wrong ")
            setLoad(false);
        })
    }

    const LoginHere = () => {
        return (
            <>
                <br/><br/><br/>
                <div className={"card"}>
                    <div className={"card-body"}>

                        <h4> Login Here</h4>
                        <hr/>
                        <form onSubmit={callApi}>
                            <div className={"form-group"}>
                                <label> Registration No & userid </label>
                                <input type={"text"} name={"username"} className={"form-control"} required={true}/>
                            </div>
                            <div className={"form-group"}>
                                <label> Password </label>
                                <input type={"password"} name={"password"} className={"form-control"} required={true}/>
                            </div>

                            <div className={"form-group"}>
                                <br/>
                                <button style={{marginRight: "10px"}} className={"btn btn-success"} type={"submit"}
                                        name={"submit"}>
                                    Login
                                </button>

                                <a role={"button"} className={"btn btn-info"}>
                                    Forgot Password
                                </a>

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
                <img style={{height: "auto", width: "100%"}} src={`${process.env.PUBLIC_URL}img/dashboard.png`}/>
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
                    <div className={"col-md-7"}>
                        <ShowLoginImage/>
                    </div>
                    <div className={"col-md-5"}>
                        <LoginHere/>
                    </div>
                </div>
            </div>
            <Bottom/>
        </>
    )
}

export default Login