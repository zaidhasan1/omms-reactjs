import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Registration from "./Registration";
import Dashboard from "./applicant/Dashboard";
import EditRegistration from "./applicant/EditRegistration";
import Document from "./applicant/Document";
import AddOmd from "./applicant/AddOmd";
import OmdDocument from "./applicant/OmdDocument";
import ViewEmi from "./applicant/ViewEmi";
import OmdView from "./applicant/OmdView";
import PaymentInfo from "./applicant/PaymentInfo";

import AdminDashboard from './admin/AdminDashboard'
import AdminRegistration from './admin/AdminRegistration'
import AdminRecall from './admin/AdminRecall'
import AdminViewEmi from './admin/AdminViewEmi'
import AdminDecline from './admin/AdminDecline'
import AdminOmd from "./admin/AdminOmd";
import AdminOmdDetails from './admin/AdminOmdDetails'
import AdminRegistrationDetails from './admin/AdminRegistrationDetails'
import AdminTransaction from "./admin/AdminTransaction";

import {positions, Provider, transitions} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Error from './Error'
import OmdFullView from "./applicant/OmdFullView";

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    transition: transitions.SCALE,
};

const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
}

ReactDOM.render(
    <Provider template={AlertTemplate} {...options}>
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact={true} path={"/applicant/registration"}>
                        <Registration/>
                    </Route>
                    <Route exact={true} path={"/applicant/dashboard"}>
                        <Dashboard/>
                    </Route>

                    <Route exact={true} path={"/applicant/edit-registration"}>
                        <EditRegistration/>
                    </Route>

                    <Route exact={true} path={"/applicant/document"}>
                        <Document/>
                    </Route>

                    <Route exact={true} path={"/applicant/apply-omd"}>
                        <AddOmd/>
                    </Route>

                    <Route exact={true} path={"/applicant/view-omd"}>
                        <OmdView/>
                    </Route>

                    <Route exact={true} path={"/applicant/omd-document/:typologyId/:id/:hash"}>
                        <OmdDocument/>
                    </Route>

                    <Route exact={true} path={"/applicant/omd-view/:id/:hash"}>
                        <OmdFullView/>
                    </Route>

                    <Route exact={true} path={"/applicant/view-emi/:id/:hash"}>
                        <ViewEmi/>
                    </Route>

                    <Route exact={true} path={"/applicant/payment-info"}>
                        <PaymentInfo/>
                    </Route>


                    {/*admin panel */}

                    <Route exact={true} path={"/admin/dashboard"}>
                        <AdminDashboard/>
                    </Route>

                    <Route exact={true} path={"/admin/registration/:string"}>
                        <AdminRegistration/>
                    </Route>

                    <Route exact={true} path={"/admin/view-emi/:omd_id"}>
                        <AdminViewEmi/>
                    </Route>

                    <Route exact={true} path={"/admin/recall"}>
                        <AdminRecall/>
                    </Route>

                    <Route exact={true} path={"/admin/decline"}>
                        <AdminDecline/>
                    </Route>

                    <Route exact={true} path={"/admin/all-omd/:string"}>
                        <AdminOmd/>
                    </Route>

                    <Route exact={true} path={"/admin/omd-details/:omd_id"}>
                        <AdminOmdDetails/>
                    </Route>

                    <Route exact={true} path={"/admin/registration-details/:registration_id"}>
                        <AdminRegistrationDetails/>
                    </Route>

                    <Route exact={true} path={"/admin/transactions"}>
                        <AdminTransaction/>
                    </Route>


                    <Route exact={true} path={"/logout"}>
                        <Logout/>
                    </Route>

                    <Route exact={true} path={'*'}>
                        <Error/>
                    </Route>

                    <Route exact={true} path={'/404'}>
                        <Error/>
                    </Route>

                </Switch>
            </Router>
        </React.StrictMode>
    </Provider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
