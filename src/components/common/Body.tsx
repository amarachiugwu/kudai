import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';



function Body() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
    </Routes>
  )
}

export default Body