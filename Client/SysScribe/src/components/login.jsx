import React from 'react';

function LoginForm(){
    return(
    <div id='login-form'>
        <div class='login'>
            <h1>Login/Register</h1>
            <form style={{display: "flex", flexDirection: "column", gap: "10px"}} method="POST">
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <input type="submit"/>
            </form>
        </div>
    </div>);
}
export default LoginForm;