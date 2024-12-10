import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>Welcome to the Journal App</h1>

      <div>
        <button onClick={toggleForm}>
          {isLogin ? 'Register Here' : 'Switch to Login'}
        </button>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default LandingPage;