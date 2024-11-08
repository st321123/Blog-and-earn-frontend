import React from 'react';
import { ClipLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <ClipLoader color="#00BFFF" size={50} loading={true} />
    </div>
  );
}

export default LoadingSpinner;
