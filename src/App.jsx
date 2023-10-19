import React, {useState} from 'react'
import { ToastContainer } from 'react-toastify';
import './App.css'
import LoginSignup from "./components/User-Login-Signup.jsx";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from "./components/Dashboard.jsx";
import 'react-toastify/dist/ReactToastify.css';
import log from 'loglevel';
import Sidebar from "./components/Sidebar.jsx";

log.setLevel(log.levels.DEBUG);


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (


      // <Sidebar/>
      // <Router>
      //   <Routes>
      //     <Route path="/" element={<LoginSignup />} />
      //       <Route path="/login" element={<LoginSignup />} />
      //     <Route path="/dashboard" element={<Dashboard />} />
      //   </Routes>
      //     <ToastContainer />
      // </Router>


      <Router>
          <Routes>
              <Route
                  path="/"
                  element={
                      isLoggedIn ? (
                          <Navigate to="/dashboard" />
                      ) : (
                          <LoginSignup onLogin={() => setIsLoggedIn(true)} />
                      )
                  }
              />
              <Route
                  path="/dashboard"
                  element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
                  path="/login"
                  element={
                      isLoggedIn ? <Navigate to="/dashboard" /> : <LoginSignup onLogin={() => setIsLoggedIn(true)} />
                  }
              />
              {/* More routes */}
          </Routes>
          <ToastContainer />
          {isLoggedIn && <Sidebar />}
      </Router>

  )
}

export default App
