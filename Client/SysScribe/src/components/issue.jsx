import React from 'react';

function Issue(props){

    return(
        <div className="issue">
            <div className="inner-issue-text">
                <p>{props.issueName}</p>
            </div>
            <div className="inner-issue">
                <p>STATUS: {props.issueState}</p>
            </div>
            <p>Sent: {props.creationTime.substring(0, 19)}</p>
            <div className="inner-issue">
                <input style={{ width: "85px", height: "35px" }} className="btn btn-danger" type="button" value="DELETE" />
            </div>
        </div>
    );
}
export default Issue;