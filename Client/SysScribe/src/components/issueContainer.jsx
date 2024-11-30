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
            const isUser = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/auth', {
                        params: { user: authData }
                    });
            console.log('Response: ', response.data);
            if (response.data) {
                    console.log('It worked');
            } else {
                    console.log('User not found');
                    Navigate('/login');
            }
        } catch (e){
            Navigate('/login');
        }
        isUser();
    }}
    else{
        Navigate('/login');
    }}, 
    []);
    //For getting current issues
    React.useEffect(async ()=>{
        const response = await axios.get('http://localhost:8080/api/get-issues', {
            params: {username: username}
        });
    }, []);
    function sendData(e, index){
        return <Issue issueName={e.issueName} description={e.description} creationTime={e.creationTime} issueState={e.issueStatus} key={index}/>
    }
    return(<div id="issue-container">
        <div id="issue-box">
            {received && received.map(sendData)}
        </div>
    </div>);
}
export default IssueContainer;