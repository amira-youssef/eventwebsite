// ErrorMessage.js

import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ErrorMessage;
