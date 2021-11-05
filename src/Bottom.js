import React from "react";

const Bottom = () => {
    return (
        <>
            <div className={"bottomName"}>
               <div className={"container"}>
                   <div className={"row"}>
                       <div className={"col-md-6"} style={{fontSize:"16px",color : "black"}}>
                           Copyright © {new Date().getFullYear()} Outdoor Media Management System. All rights reserved.
                       </div>
                       <div className={"col-md-6"} style={{fontSize:"16px",textAlign:"right",color : "black"}}>
                           Municiple Corporation Bhopal
                       </div>
                   </div>
               </div>
            </div>
        </>
    )
}

export default Bottom