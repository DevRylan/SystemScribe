import Axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

function LoginForm(){
    const [userForm, userFormChange] = React.useState({username: '', password: ''});
    const [error, setError] = React.useState('');

    const Navigate = useNavigate();
    
    function updateInfo(e){
        if (e.target.placeholder === "Username"){
            userFormChange((prevValue)=>{
            return{
                username: e.target.value,
                password: prevValue.password
            }
            });
        }
        else{
            userFormChange((prevValue)=>{
                return{
                username: prevValue.username,
                password: e.target.value};
            })
        }
    }
    async function handleClick(e){
        console.log('Response: about to try');
        const response = await Axios.post('http://localhost:8080/api/login', userForm);
        console.log('Response: ' +response.data.login);
        if (response.data.login){
            localStorage.setItem('auth', JSON.stringify(response.data.auth));
            Navigate('/menu')
        } else{
            console.log('LOGIN FAILED: INCORRECT CREDENTIALS');
            setError(response.data.reason);
        }
    }
    return(
    <div id='login-form'>
        <div className='login'>
            <h1>Login</h1>
            <form style={{display: "flex", 
                          flexDirection: "column", 
                          gap: "10px"}} method="POST" >
                <input type="text" placeholder="Username" onChange={updateInfo} className={error ? "error-input" : ""}/>
                <input type="password" placeholder="Password" onChange={updateInfo} className={error ? "error-input" : ""}/>
                <button type="button" onClick={handleClick} className="btn btn-primary">Login</button>
            </form>
            <a href='/admin'style=
            {{ color: 'blue', 
               textDecoration: 'underline', 
               cursor: 'pointer' }}>
               Or login as Admin.</a>
            <a href='/register'style=
            {{ color: 'blue', 
               textDecoration: 'underline', 
               cursor: 'pointer' }}>
               Or Create an Account.</a>
            {error ? <h3 className="error">{error}</h3> : null}
        </div>
    </div>);
}
export default LoginForm;