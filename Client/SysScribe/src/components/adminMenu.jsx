import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Issue from "./issue";


function AdminMenu(){
    const [received, addRecieved] = React.useState([]);
    const Navigate = useNavigate();

    React.useEffect(()=>{
        const authData = JSON.parse(localStorage.getItem('admin-auth'));
        console.log('Data: '+authData);
        if (authData) {
            async function isUser() {
                console.log("function is working: " +authData);
                try {
                    console.log("about to try auth");
                    const response = await axios.get('http://localhost:8080/api/check-admin-auth', {
                        params: { user: authData }
                    });
            console.log('Response: ', response.data);
            if (response.data) {
                    console.log('It worked');
            } else {
                    console.log('It didnt work');
                    Navigate('/login');
            }
        } catch (e){
            console.log(e);
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
    function sendData(e, index){
        return <Issue issueName={e.issueName} description={e.description} creationTime={e.creationTime} issueState={e.issueStatus} issueId={e.issueId} key={index}/>

    }
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/get-all-issues');
                addRecieved(response.data);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        };
        fetchData();
        console.log(`Recieved data is: ${received.length}`);
    }, []);
    return(
        <div id="issue-container">
        <div className="user-button-container">
            <h3 className="default-text">User Issues</h3>
            <button className="btn btn-danger" onClick={()=>{localStorage.removeItem('admin-auth'); Navigate('/login');}}>Logout</button>
        </div>
        <div id="issue-box">
            {received && received.map(sendData)}
        </div>
    </div>);
}

export default AdminMenu;