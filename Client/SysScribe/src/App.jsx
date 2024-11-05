import { useState } from 'react'
//import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/loginPage';
import AdminLoginPage from './pages/adminLoginPage';
import IssueMenu from './pages/IssueMenu';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/admin" element={<AdminLoginPage/>}/>
        <Route path="/menu" element={<IssueMenu/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
