import Axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

function AdminLoginForm(){
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const Navigate = useNavigate();
    async function handleClick(e){
        console.log('Response: about to try');
        const response = await Axios.get('http://localhost:8080/api/check-admin', {
            params: { user: password }
        });
        console.log('Response: ' +response.data.login);
        if (response.data.login){
            localStorage.setItem('admin-auth', JSON.stringify("IsAdmin"));
            Navigate('/admin-menu');
        } else{
            console.log('LOGIN FAILED: INCORRECT CREDENTIALS');
            setError(true);
        }
    }
    return(
    <div id='login-form'>
        <div className='login'>
            <h1 className="default-text">Admin Login</h1>
            <form style={{display: "flex", flexDirection: "column", gap: "10px"}} method="POST">
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}placeholder="Password"/>
                <button type="button" onClick={handleClick} className="btn btn-primary">Login</button>
            </form>
            <a href='/login'style={{ color: '#0000EE', textDecoration: 'underline', cursor: 'pointer' }}>Or login as User.</a>
            {error ? <h3 className="error">Incorrect Password!</h3> : null}
        </div>
    </div>);
}
export default AdminLoginForm;