import React, { useState } from 'react';
import ClientBriefForm from './components/ClientBriefForm';
import LoadingSpinner from './components/LoadingSpinner';
import MatchResultCard from './components/MatchResultCard';

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
      {loading && <LoadingSpinner />}
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
