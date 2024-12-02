import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

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
                    useNavigate('/login');
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
    return(
        <div id="issue-container">
        <div className="user-button-container">
            <h3 className="default-text">User Issues</h3>
            <button className="btn btn-danger" onClick={()=>{localStorage.removeItem('admin-auth'); Navigate('/login');}}>Logout</button>
        </div>
        <div id="issue-box">
            {/*{received && received.map(sendData)}*/}
        </div>
    </div>);
}

export default AdminMenu;