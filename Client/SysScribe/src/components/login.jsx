import Axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

function LoginForm(){
    const [message, setMessage] = React.useState('');
    const [userForm, userFormChange] = React.useState({username: '', password: ''});
    const Navigate = useNavigate();

    React.useEffect(()=>{
        const data = async ()=>{
            try{
            const response = await Axios.get('http://localhost:8080/api/message');
            setMessage(response.data.message);
            console.log(response.data);
            }catch(err){
                console.log(err);
            }
        };
        data();
    }, [])
    
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
            Navigate('/menu')
        } else{
            console.log('LOGIN FAILED: INCORRECT CREDENTIALS');
        }
    }
    return(
    <div id='login-form'>
        <div className='login'>
            <h1>Login/Register</h1>
            <form style={{display: "flex", 
                          flexDirection: "column", 
                          gap: "10px"}} method="POST" >
                <input type="text" placeholder="Username" onChange={updateInfo}/>
                <input type="password" placeholder="Password" onChange={updateInfo}/>
                <button type="button" onClick={handleClick} className="btn btn-primary">Login</button>
            </form>
            <a href='/admin'style=
            {{ color: 'blue', 
               textDecoration: 'underline', 
               cursor: 'pointer' }}>
               Or login as Admin.</a>
        </div>
    </div>);
}
export default LoginForm;