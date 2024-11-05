import React from "react";
import Header from "../components/header";
import LoginForm from "../components/login";

function loginPage(){
    return(
        <div id="login">
            <Header/>
            <LoginForm/>
        </div>
    );
}
export default loginPage;