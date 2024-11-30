import React from "react";
import Header from "../components/header";
import RegisterForm from "../components/register";

function loginPage(){
    return(
        <div id="login">
            <Header/>
            <RegisterForm/>
        </div>
    );
}
export default loginPage;