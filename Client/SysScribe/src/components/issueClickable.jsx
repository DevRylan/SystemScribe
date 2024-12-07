import React from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Issue(props){
    const [isDeleted, setIsDeleted] = React.useState(false);
    const Navigate = useNavigate();

    function DeleteIssue(){
        const Delete = async () => {
            await Axios.post('http://localhost:8080/api/delete-issue', {issueId: props.issueId})
            setIsDeleted(true);
        }
        Delete();
    }
    if(isDeleted) return null;
    function handleClick(){
        localStorage.setItem('myProps', JSON.stringify(props));
        Navigate('/issue-view');
    }
    return(
        <div className="issue admin-issue" onClick={handleClick}>
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