import React from 'react';

function Issue(){

    return(
        <div className="issue">
            <p>Issue Name</p>
            <div className="inner-issue">
                <p>STATUS: Ongoing</p>
            </div>
            <p>Sent: 11/5/2024</p>
            <div className="inner-issue">
                <input style={{ width: "85px", height: "35px" }} className="btn btn-danger" type="button" value="DELETE" />
            </div>
        </div>
    );
}
export default Issue;