import React from 'react';
import LoginForm from '../components/LoginForm';
const LoginScreen = ({ onLogin }) => {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginScreen;
