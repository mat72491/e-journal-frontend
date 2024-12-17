import React, { useState } from 'react';
import { loginUser, registerUser } from './services/authService';

const HomePage = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else if (formType === 'register') {
      setRegisterData({ ...registerData, [name]: value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(loginData.username, loginData.password);
      setSuccessMessage('Logged in successfully!');
      window.location.href = '/'; // Redirect to homepage or protected route
    } catch (err) {
      setError('Invalid login credentials.');
    }
  };

 
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(registerData.username, registerData.password, registerData.email);
      setSuccessMessage('Registered successfully! You can now log in.');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Your Journal</h1>
      <div style={styles.formsContainer}>
        {/* Login Form */}
        <form style={styles.form} onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => handleChange(e, 'login')}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => handleChange(e, 'login')}
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* Register Form */}
        <form style={styles.form} onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) => handleChange(e, 'register')}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => handleChange(e, 'register')}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => handleChange(e, 'register')}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  formsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '50px',
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '250px',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
};

export default HomePage;