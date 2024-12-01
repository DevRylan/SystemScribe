import React from 'react';
import Axios from 'axios';
function Issue(props){
    const [isDeleted, setIsDeleted] = React.useState(false);
    function DeleteIssue(){
        const Delete = async () => {
            await Axios.post('http://localhost:8080/api/delete-issue', {issueId: props.issueId})
            setIsDeleted(true);
        }
        Delete();
    }
    if(isDeleted) return null;
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
                <input style={{ width: "85px", height: "35px" }} className="btn btn-danger" type="button" value="DELETE" onClick={DeleteIssue}/>
            </div>
        </div>
    );
}
export default Issue;