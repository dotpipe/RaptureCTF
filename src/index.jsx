import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import '../public/styles.css'; // Add global styles if necessary

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
