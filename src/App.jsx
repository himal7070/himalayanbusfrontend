import React from 'react'
import { ToastContainer } from 'react-toastify';
import './App.css'
import LoginSignup from "./components/User-Login-Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard.jsx";
import 'react-toastify/dist/ReactToastify.css';
import log from 'loglevel';

log.setLevel(log.levels.DEBUG);


function App() {

  return (

      // <LoginSignup/>

      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
            <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
          <ToastContainer />
      </Router>

  )
}

export default App
