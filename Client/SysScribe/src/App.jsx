import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/loginPage';
import AdminLoginPage from './pages/adminLoginPage';
import IssueMenu from './pages/IssueMenu';
import RegisterPage from './pages/registerPage';
import IssuePage from './pages/IssuePage';
import AdminMenuPage from './pages/AdminMenuPage';
import IssueViewPage from "./pages/IssueViewPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path="/admin" element={<AdminLoginPage/>}/>
        <Route path="/menu" element={<IssueMenu/>}/>
        <Route path="/report-issue" element={<IssuePage/>}/>
        <Route path="/admin-menu" element={<AdminMenuPage/>}/>
        <Route path="/issue-view" element={<IssueViewPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
