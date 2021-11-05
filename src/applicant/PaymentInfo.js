import Top from "../Top";
import Navbars from "../Navbars";
import Bottom from "../Bottom";
import React from "react";

const PaymentInfo = () => {


    const payment = [
        {
            method: "Online",
            amount: "1000",
            date: "13 Aug 2021",
            time: "04:24:36 PM",
            status: "Success",
            type: "Processing Fee ",
            txn_id: "125665566655"
        },
        {
            method: "Online",
            amount: "1000",
            date: "13 Aug 2021",
            time: "04:24:36 PM",
            status: "Success",
            type: "AdminRegistration Fee",
            txn_id: "125665566655"
        }
    ];

    return (
        <>
            <Top/>
            <Navbars/>
            <div className={"container"} style={{marginTop: "100px", marginBottom: "150px"}}>
                <div className={"row"}>
                    <h5>Payment Info</h5>
                    <hr/>
                    <div className={"row"}>
                        {
                            payment.map((v) => {
                                return (
                                    <>
                                        <div className={"col-md-3"} style={{marginTop: "10px", marginBottom: "10px"}}>
                                            <div className={"card"}>
                                                <div className={"card-body"}>
                                                    <h5><span
                                                        style={{
                                                            color: "#007aaf",
                                                            fontWeight: "bold"
                                                        }}> {v.txn_id} </span></h5>
                                                    <h4 style={{color: "#636363"}}>{v.type}</h4>
                                                    <table className={"table table-striped"}>
                                                        <tbody>
                                                        <tr>
                                                            <th>Method</th>
                                                            <td>{v.method}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Amount</th>
                                                            <td>{v.amount}</td>
                                                        </tr>

                                                        <tr>
                                                            <th> Date</th>
                                                            <td>{v.date}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Time</th>
                                                            <td>{v.time}</td>
                                                        </tr>

                                                        <tr>
                                                            <th> Status</th>
                                                            <td>{v.status}</td>
                                                        </tr>

                                                        <tr>
                                                            <th colspan={2} style={{textAlign: "right"}}>
                                                                <button className={"btn btn-success btn-sm"}>
                                                                    Receipt
                                                                </button>
                                                            </th>
                                                        </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Bottom/>
        </>
    )
}

export default PaymentInfo