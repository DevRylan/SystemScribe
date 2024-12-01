import React from "react";
import Issue from "./issue";
import axios, { Axios } from "axios";
import {useNavigate} from 'react-router-dom'

function IssueContainer(){
    const [received, addRecieved] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const Navigate = useNavigate();

    //For getting authentication
    React.useEffect(()=>{
        const authData = JSON.parse(localStorage.getItem('auth'));
        setUsername(authData);
        console.log('Data: '+authData);
        if (authData) {
            console.log("inside if statement");
            async function isUser() {
                console.log("function is working");
                try {
                    console.log("about to try auth");
                    const response = await axios.get('http://localhost:8080/api/auth', {
                        params: { user: authData }
                    });
            console.log('Response: ', response.data);
            if (response.data) {
                    console.log('It worked');
            } else {
                    console.log('User not found: '+response.data);
                    Navigate('/login');
            }
        } catch (e){
            console.log('ERR');
            Navigate('/login');
        }
        console.log('End of function');
    }
        isUser();
    }
    else{
        console.log('ERR inner condition');
        Navigate('/login');
    }}, 
    []);
    //For getting current issues
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/get-issues', {
                    params: { user: username }
                });
                addRecieved(response.data);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        };
        fetchData();
        console.log(`Recieved data is: ${received.length}`);
    }, [username]);
    function sendData(e, index){
        return <Issue issueName={e.issueName} description={e.description} creationTime={e.creationTime} issueState={e.issueStatus} issueId={e.issueId} key={index}/>
    }
    return(<div id="issue-container">
        <div className="user-button-container">
            <button className="btn btn-info" onClick={() => Navigate('/report-issue')}>Report Issue</button>
            <h3 className="default-text">My Issues</h3>
            <button className="btn btn-danger" onClick={()=>{localStorage.removeItem('auth'); Navigate('/login');}}>Logout</button>
        </div>
        <div id="issue-box">
            {received && received.map(sendData)}
        </div>
    </div>);
}
export default IssueContainer;