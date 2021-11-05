import Top from "../Top";
import Navbars from "../Navbars";
import Bottom from "../Bottom";
import React from "react";

const AdminDecline = () => {

    const data = [
        {
            due_date: "2021-01-12",
            amount: 2000,
            penality: 0,
            fee_txn_id: 4522255655554,
            is_paid: 0
        },
        {
            due_date: "2021-02-12",
            amount: 2000,
            penality: 0,
            fee_txn_id: 4522255655554,
            is_paid: 0
        },
        {
            due_date: "2021-03-12",
            amount: 2000,
            penality: 0,
            fee_txn_id: 4522255655554,
            is_paid: 0
        },
        {
            due_date: "2021-04-12",
            amount: 2000,
            penality: 0,
            fee_txn_id: 4522255655554,
            is_paid: 0
        },
        {
            due_date: "2021-05-12",
            amount: 2000,
            penality: 0,
            fee_txn_id: 4522255655554,
            is_paid: 0
        },
    ];

    return (
        <>
            <Top/>
            <Navbars/>
            <div className={"container"} style={{marginTop: "100px", marginBottom: "150px"}}>
                <div className={"row"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h5>View Decline </h5>
                            <hr/>

                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th> Sno</th>
                                    <th> Due Date</th>
                                    <th> Amount</th>
                                    <th> Penalty</th>
                                    <th> Fee Txn Id</th>
                                    <th> Is Paid</th>
                                    <th> Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    data.map((v, index) => {
                                        let pay = data[index].is_paid == undefined ? data[index].is_paid : "first";
                                        return (
                                            <>
                                                <tr>
                                                    <td> {index + 1}</td>
                                                    <td> {v.due_date}</td>
                                                    <td>{v.amount}</td>
                                                    <td>{v.penality}</td>
                                                    <td>{v.fee_txn_id}</td>
                                                    <td>{v.is_paid == 1 ? "Paid" : "Not Paid"}</td>
                                                    <td>
                                                        pay
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <Bottom/>
        </>
    )
}

export default AdminDecline