import { useState } from 'react'
//import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/loginPage';
import AdminLoginPage from './pages/adminLoginPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/admin" element={<AdminLoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
