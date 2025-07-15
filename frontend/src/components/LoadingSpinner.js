import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="text-center my-4">
      <div className="spinner-border text-primary" style={{ width: 40, height: 40 }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div>Loading...</div>
    </div>
  );
} 