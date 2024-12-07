import Axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

function IssueView(){
    const [info, setInfo] = React.useState([]);
    const [email, setEmail] = React.useState("");
    const [usersEmail, setUsersEmail] = React.useState("");
    const Navigate = useNavigate();

    React.useEffect(()=>{
        try{
        setInfo(JSON.parse(localStorage.getItem('myProps')));
        console.log("Users email: "+info.email);
        setUsersEmail(info.email);
        } catch{
            Navigate('/admin-menu');
        }
    }, []);
    function SubmitEmail(){
        try {
            Axios.post('http://localhost:8080/api/submit-email', {"info": info.issueId.toString(), "email": email, "usersEmail": usersEmail});
            Navigate('/admin-menu')
        }catch(e){
            Navigate('/admin-menu')
            console.log(e);
        }
    }
    return(
        <div className="issue-view-container">
        <div className="issue-view default-text">
            <h3>{info.issueName}</h3>
            <h5 style={{marginTop: "8px", display: "flex", justifyContent: "end", marginRight: "25px"}}>Creation Time: 239023 502935 25</h5>
            <p>{info.description}</p>
            <h5 style={{gridRowStart: "3"}}>Os: {info.os}</h5>
            <h5 style={{marginTop: "8px", display: "flex", justifyContent: "end", marginRight: "25px", gridRowStart: "3"}}>Severity: {info.severity}</h5>
        </div>
        <div className= "default-text solution-form" style={{border: "01px solid black", borderRadius: "5px"}}>
            <h4>Solution: </h4>
            <textarea placeholder="List Detailed steps here..." className="admin-text-area" onChange={(e) => setEmail(e.target.value)}></textarea>
            <button className="btn btn-primary" onClick={SubmitEmail}>Submit</button>
        </div>
        </div>
    );
}

export default IssueView;