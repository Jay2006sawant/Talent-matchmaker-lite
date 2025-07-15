import React from 'react';

export default function MatchResultCard({ creator, onFeedback, previousFeedback }) {
  return (
    <div className="card shadow-sm mb-3 MatchResultCard">
      <div className="card-body">
        <h5 className="card-title">{creator.name}</h5>
        <h6 className="card-subtitle mb-2 text-primary">Score: {creator.score}</h6>
        <p className="card-text"><strong>Reason:</strong> {creator.rationale}</p>
        {creator.portfolio && (
          <a href={creator.portfolio} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm me-2">Portfolio</a>
        )}
        {previousFeedback && (
          <div className="mt-2">
            <span className="badge bg-info text-dark">
              Previous feedback: {previousFeedback === 'up' ? '👍' : '👎'}
            </span>
          </div>
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
  );
} 