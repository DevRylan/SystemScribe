import React from "react";
import axios from "axios";

function AdminMenu(){

    return(
        <div id="issue-container">
        <div className="user-button-container">
            <h3 className="default-text">User Issues</h3>
            <button className="btn btn-danger" onClick={()=>{localStorage.removeItem('auth'); Navigate('/login');}}>Logout</button>
        </div>
        <div id="issue-box">
            {/*{received && received.map(sendData)}*/}
        </div>
    </div>);
}

export default AdminMenu;