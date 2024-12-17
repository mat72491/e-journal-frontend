import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function LandingPage(props) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>My Journal</h1>
      <div>
        <button onClick={toggleForm}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
      {isLogin ? (
        <LoginForm onLogin={props.onLogin} /> 
      ) : (
        <RegisterForm /> 
      )}
    </div>
  );
}

export default LandingPage;