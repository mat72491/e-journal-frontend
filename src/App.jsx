import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../EJournal/components/LandingPage';
import Dashboard from '../EJournal/components/Dashboard';
import WriteEntry from '../EJournal/components/WriteEntry';
import IndexPage from '../EJournal/components/IndexPage';
import EntryDetailPage from '../EJournal/components/EntryDetailPage';
import EditEntryPage from '../EJournal/components/EditEntryPage';
import PrivateRoute from '../EJournal/components/PrivateRoute';
import Navbar from '../EJournal/components/Navbar';
import './App.css';
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false)
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


  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
        username,
        password,
      });
  
      // Save the access token to localStorage
      localStorage.setItem('token', response.data.access);
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

console.log(isAuthenticated)
  return (
    <Router>
    <div>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<LandingPage onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
        <Route
          path="/dashboard/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
            
          }
        />
        <Route path="/write-entry/" element={<PrivateRoute><WriteEntry /></PrivateRoute>} />
        <Route path="/entries/" element={<IndexPage />} />
        <Route path="/entries/:id/" element={<EntryDetailPage />} />
        <Route path="/entries/:id/edit/" element={<EditEntryPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;