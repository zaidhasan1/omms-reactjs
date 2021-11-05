import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";

const Navbars = () => {

    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);


    useEffect(() => {

        const r = localStorage.getItem("role");
        const u = localStorage.getItem("id");

        console.log("role ", r)
        console.log("user ", u);

        const r1 = r != undefined || r != null ? r : null
        const u1 = u != undefined || u != null ? u : null

        setRole(r1);
        setUserId(u1);

    }, [])

    const RegNav = () => {
        return (
            <>

                <NavDropdown title="Registration" id={"registration"}>
                    <NavDropdown.Item href="/applicant/edit-registration">
                        <i className="fa fa-angle-double-right"></i> Edit Registration
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/applicant/document">
                        <i className="fa fa-angle-double-right"></i> Manage Document
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Omd" id="omd">
                    <NavDropdown.Item href="/applicant/apply-omd"> <i
                        className="fa fa-angle-double-right"></i> Apply OMD</NavDropdown.Item>
                    <NavDropdown.Item href="/applicant/view-omd"><i
                        className="fa fa-angle-double-right"></i> View OMD</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/applicant/payment-info">Payment Info</Nav.Link>

                <Nav.Link onClick={() => {
                    if (window.confirm("Are you sure you want to logout ")) {
                        window.location.href = "/logout"
                    }
                }}>Logout</Nav.Link>

            </>
        )
    }

    const LoginRegistration = () => {
        return (
            <>
                <Nav.Link href={"/"}>Login</Nav.Link>
                <Nav.Link href={"/applicant/registration"}>Registration</Nav.Link>
            </>
        )
    }

    const UserNavbar = () => {
        return (
            <>
                <Navbar bg={"success"} variant={"dark"} expand="lg" style={{position:"sticky",top:0,zIndex : 99999}}>
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Link href="#link">Home</Nav.Link>

                                <NavDropdown title="Information" id="information">
                                    <NavDropdown.Item href="#action/3.1"><i
                                        className="fa fa-angle-double-right"></i> Prohibited Areas.</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2"><i
                                        className="fa fa-angle-double-right"></i> List of Negative Advertisement.
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Downloads" id="download">
                                    <NavDropdown.Item href="#action/3.1"><i
                                        className="fa fa-angle-double-right"></i> MP Outdoor Media
                                        Rules.</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2"><i
                                        className="fa fa-angle-double-right"></i> Self Certification For OMD
                                        Application.
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3"><i
                                        className="fa fa-angle-double-right"></i> Documents Required For
                                        AdminRegistration </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3"><i
                                        className="fa fa-angle-double-right"></i> Documents Required For
                                        OMD Application </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3"><i
                                        className="fa fa-angle-double-right"></i> Self Certification Format
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3"><i
                                        className="fa fa-angle-double-right"></i> Structural Certification Format
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3"><i
                                        className="fa fa-angle-double-right"></i> Property Layout</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Fee" id="fee">
                                    <NavDropdown.Item href="#action/3.1"><i
                                        className="fa fa-angle-double-right"></i> Advertisement License Fees &
                                        Charges.</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2"><i
                                        className="fa fa-angle-double-right"></i> AdminRegistration & Processing Fees.
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3"><i
                                        className="fa fa-angle-double-right"></i> License Fee Determination
                                    </NavDropdown.Item>
                                </NavDropdown>

                                {userId != null ? <RegNav/> : <LoginRegistration/>}

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }

    const AdminNavbar = () => {
        return (
            <>
                <Navbar bg={"success"} variant={"dark"} expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Link href="/admin/dashboard">Home</Nav.Link>

                                <NavDropdown title="Registration" id="fee">
                                    <NavDropdown.Item href="/admin/registration/All"><i
                                        className="fa fa-angle-double-right"></i> All Registration</NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/registration/Approved"><i
                                        className="fa fa-angle-double-right"></i> Approved Registration
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/registration/decline"><i
                                        className="fa fa-angle-double-right"></i> Decline Registration
                                    </NavDropdown.Item>
                                </NavDropdown>


                                <NavDropdown title="Omd Application" id="download">
                                    <NavDropdown.Item href="/admin/all-omd/all"><i
                                        className="fa fa-angle-double-right"></i> All OMD </NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/all-omd/approved"><i
                                        className="fa fa-angle-double-right"></i> Approved OMD
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/all-omd/decline"><i
                                        className="fa fa-angle-double-right"></i> Declined OMD </NavDropdown.Item>

                                </NavDropdown>

                                <Nav.Link href="/admin/transactions">Transaction </Nav.Link>

                                <Nav.Link onClick={() => {
                                    if (window.confirm("Are you sure you want to logout ")) {
                                        window.location.href = "/logout"
                                    }
                                }}>Logout</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }

    return (
        <>
            {
                role == "admin" ? <AdminNavbar/> : <UserNavbar/>
            }
        </>
    )
}

export default Navbars
