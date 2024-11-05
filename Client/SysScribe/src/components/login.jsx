import Axios from 'axios';
import React from 'react';

function LoginForm(){
    const [message, setMessage] = React.useState('');
    const [online, setOnline] = React.useState(null);
    
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

    React.useEffect(()=>{
        const pingServer = async () => {
            console.log('Trying');
            try {
                
            await axios.get('http://localhost:8080/api/ping')
            setOnline(true);
        } catch(err){
            setOnline(false);
            }
        };

        const intereval = setInterval(pingServer, 3000);
        pingServer();

    }, []);

    return(
    <div id='login-form'>
        <div className='login'>
            <h1>Login/Register</h1>
            <form style={{display: "flex", flexDirection: "column", gap: "10px"}} method="POST">
                <input type="text" placeholder={message}/>
                <input type="password" placeholder="Password"/>
                <input type="submit"/>
            </form>
        </div>
    </div>);
}
export default LoginForm;