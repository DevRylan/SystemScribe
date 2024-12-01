import React from 'react';

function Issue(props){

    return(
        <div className="issue">
            <div className="inner-issue-text">
                <p>{props.issueName}</p>
            </div>
            <div className="inner-issue">
                <p>STATUS: {props.creationTime.substring(0, 19)}</p>
            </div>
            <p>Sent: {props.issueState}</p>
            <div className="inner-issue">
                <input style={{ width: "85px", height: "35px" }} className="btn btn-danger" type="button" value="DELETE" />
            </div>
        </div>
    );
}
export default Issue;