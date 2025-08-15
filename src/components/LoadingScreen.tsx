import React from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <h1>Loading...</h1>
    </div>
  );
};

export default LoadingScreen;
