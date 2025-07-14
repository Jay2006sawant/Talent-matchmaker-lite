import React from 'react';

export default function MatchResultCard({ creator }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, margin: '16px 0' }}>
      <h3>{creator.name}</h3>
      <p><strong>Score:</strong> {creator.score}</p>
      <p><strong>Reason:</strong> {creator.rationale}</p>
      {creator.portfolio && (
        <p><a href={creator.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></p>
      )}
    </div>
  );
} 