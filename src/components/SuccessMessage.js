// SuccessMessage.js

import React from 'react';

const SuccessMessage = ({ message, onClose }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SuccessMessage;
