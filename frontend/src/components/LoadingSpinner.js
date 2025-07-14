import React from 'react';

export default function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', margin: '24px 0' }}>
      <div className="spinner" style={{
        width: 40,
        height: 40,
        border: '4px solid #cbd5e0',
        borderTop: '4px solid #3182ce',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div>Loading...</div>
    </div>
  );
} 