import React from 'react';

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

export default function MatchResultCard({ creator, onFeedback, previousFeedback }) {
  return (
    <div className="card shadow-lg mb-4 MatchResultCard" style={{ fontFamily: 'Montserrat, Arial, sans-serif', border: 'none' }}>
      <div className="card-body d-flex align-items-center">
        <div className="me-4 d-flex flex-column align-items-center">
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 24,
            boxShadow: '0 2px 8px rgba(59,130,246,0.15)'
          }}>
            {getInitials(creator.name)}
          </div>
          {creator.remote && (
            <span className="badge bg-success mt-2">Remote</span>
          )}
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-1">
            <h5 className="card-title mb-0 me-2" style={{ fontWeight: 700 }}>{creator.name}</h5>
            <span className="badge bg-primary" style={{ fontSize: '1rem', fontWeight: 600 }}>Score: {creator.score}</span>
          </div>
          <h6 className="card-subtitle mb-2 text-primary" style={{ fontWeight: 600 }}>Reason:</h6>
          <p className="card-text mb-2" style={{ fontSize: '1.05rem' }}>{creator.rationale}</p>
          {creator.portfolio && (
            <a href={creator.portfolio} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm me-2">Portfolio</a>
          )}
          {previousFeedback && (
            <span className="badge bg-info text-dark ms-1">Previous feedback: {previousFeedback === 'up' ? '👍' : '👎'}</span>
          )}
          <div className="mt-3">
            <button type="button" className="btn btn-success btn-sm me-2" title="Thumbs Up" onClick={() => onFeedback && onFeedback(creator.id, 'up')}>
              <span role="img" aria-label="Thumbs Up">👍</span>
            </button>
            <button type="button" className="btn btn-danger btn-sm" title="Thumbs Down" onClick={() => onFeedback && onFeedback(creator.id, 'down')}>
              <span role="img" aria-label="Thumbs Down">👎</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 