import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div className="loading">
      <div className="uil-ring-css" style={{ transform: 'scale(0.79)' }}>
        <div />
      </div>
    </div>
  );
};

export default Loader;
