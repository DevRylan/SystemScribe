import Axios from 'axios';
import React from 'react';

function LoginForm(){
    const [message, setMessage] = React.useState('');
    
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

    return(
    <div id='login-form'>
        <div className='login'>
            <h1>Login/Register</h1>
            <form style={{display: "flex", flexDirection: "column", gap: "10px"}} method="POST">
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <input type="submit"/>
            </form>
            <a href='/admin'style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Or login as Admin.</a>
        </div>
    </div>);
}
export default LoginForm;