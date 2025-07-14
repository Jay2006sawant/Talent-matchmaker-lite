import React, { useState } from 'react';
import ClientBriefForm from './components/ClientBriefForm';

function MatchResultCard({ creator }) {
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

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBriefSubmit = async (brief) => {
    setLoading(true);
    setError('');
    setMatches([]);
    try {
      const res = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brief)
      });
      if (!res.ok) throw new Error('Failed to fetch matches');
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError(err.message || 'Error fetching matches');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Talent Matchmaker Lite</h1>
      <ClientBriefForm onSubmit={handleBriefSubmit} />
      {loading && <p>Loading matches...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {matches.length > 0 && (
        <div>
          <h2>Top Matches</h2>
          {matches.map(creator => (
            <MatchResultCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
