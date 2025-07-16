import React, { useState } from 'react';
import ClientBriefForm from './components/ClientBriefForm';
import LoadingSpinner from './components/LoadingSpinner';
import MatchResultCard from './components/MatchResultCard';

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, minWidth: 220 }}>
      <div className="toast show align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            {message}
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);

  const handleBriefSubmit = async (brief) => {
    setLoading(true);
    setError('');
    setMatches([]);
    try {
      const res = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brief) // brief now includes remoteOnly
      });
      if (!res.ok) throw new Error('Failed to fetch matches');
      const data = await res.json();
      setMatches(data);
      // Fetch feedback for these matches
      const feedbackRes = await fetch('http://localhost:5000/api/feedback');
      if (feedbackRes.ok) {
        const feedback = await feedbackRes.json();
        setFeedbackData(feedback);
      } else {
        setFeedbackData([]);
      }
    } catch (err) {
      setError(err.message || 'Error fetching matches');
    } finally {
      setLoading(false);
    }
  };

  // Feedback handler
  const handleFeedback = async (creatorId, feedback) => {
    try {
      setFeedbackMsg('');
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creatorId, feedback })
      });
      if (!res.ok) throw new Error('Failed to send feedback');
      setFeedbackMsg('Thank you for your feedback!');
      setTimeout(() => setFeedbackMsg(''), 2000);
      // Refresh feedback data after submitting
      const feedbackRes = await fetch('http://localhost:5000/api/feedback');
      if (feedbackRes.ok) {
        const feedbackArr = await feedbackRes.json();
        setFeedbackData(feedbackArr);
      }
    } catch (err) {
      setFeedbackMsg('Error sending feedback.');
      setTimeout(() => setFeedbackMsg(''), 2000);
    }
  };

  // Clear matches when form changes
  const handleFormChange = () => {
    setMatches([]);
    setError('');
    setFeedbackData([]);
  };

  return (
    <div className="container py-4">
      <Toast message={feedbackMsg} onClose={() => setFeedbackMsg('')} />
      <h1 className="text-center mb-4">Talent Matchmaker Lite</h1>
      <ClientBriefForm onSubmit={handleBriefSubmit} onFormChange={handleFormChange} />
      {loading && <LoadingSpinner />}
      {error && <p className="alert alert-danger text-center">{error}</p>}
      {!loading && !error && matches && matches.length === 0 && (
        <p className="text-secondary text-center mt-4">No matches found. Please try different criteria.</p>
      )}
      {matches.length > 0 && (
        <div>
          <h2 className="mb-3">Top Matches</h2>
          {matches.map(creator => {
            // Find the most recent feedback for this creator (compare as strings)
            const creatorFeedback = feedbackData.filter(f => String(f.creatorId) === String(creator.id));
            const lastFeedback = creatorFeedback.length > 0 ? creatorFeedback[creatorFeedback.length - 1].feedback : null;
            return (
              <MatchResultCard key={creator.id} creator={creator} onFeedback={handleFeedback} previousFeedback={lastFeedback} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
