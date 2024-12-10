import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import WriteEntry from '../components/WriteEntry';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import './App.css';
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://127.0.0.1:8000/entries/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => {
          setEntries(response.data); 
        })
        .catch(error => {
          console.error("Error fetching entries:", error);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update based on token presence
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true); // Update state when login is successful
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };


  return (
    <Router>
    <div>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
            
          }
        />
        <Route path="/write-entry" element={<PrivateRoute><WriteEntry /></PrivateRoute>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;