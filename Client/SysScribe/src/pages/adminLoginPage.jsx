import React from "react";
import Header from "../components/header";
import AdminLoginForm from "../components/adminLogin";

function AdminLoginPage(){
    return(
        <div id="login">
            <Header/>
            <AdminLoginForm/>
        </div>
    );
}
export default AdminLoginPage;