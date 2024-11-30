import React from "react";
import Issue from "./issue";
import axios, { Axios } from "axios";
import {useNavigate} from 'react-router-dom'

function IssueContainer(){
    const Navigate = useNavigate();

    React.useEffect(()=>{
        const authData = JSON.parse(localStorage.getItem('auth'));
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
    return(<div id="issue-container">
        <div id="issue-box">
            <Issue />
            <Issue />
            <Issue />
            <Issue />
        </div>
    </div>);
}
export default IssueContainer;