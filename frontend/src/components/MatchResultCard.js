import React from 'react';

export default function MatchResultCard({ creator }) {
  return (
    <div className="card shadow-sm mb-3 MatchResultCard">
      <div className="card-body">
        <h5 className="card-title">{creator.name}</h5>
        <h6 className="card-subtitle mb-2 text-primary">Score: {creator.score}</h6>
        <p className="card-text"><strong>Reason:</strong> {creator.rationale}</p>
        {creator.portfolio && (
          <a href={creator.portfolio} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">Portfolio</a>
        )}
      </div>
    </div>
  );
} 