import React, { useState } from 'react';
import ClientBriefForm from './components/ClientBriefForm';
import LoadingSpinner from './components/LoadingSpinner';
import MatchResultCard from './components/MatchResultCard';

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
        body: JSON.stringify(brief)
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
      <h1 className="text-center mb-4">Talent Matchmaker Lite</h1>
      <ClientBriefForm onSubmit={handleBriefSubmit} onFormChange={handleFormChange} />
      {loading && <LoadingSpinner />}
      {error && <p className="alert alert-danger text-center">{error}</p>}
      {feedbackMsg && <div className="alert alert-info text-center">{feedbackMsg}</div>}
      {!loading && !error && matches && matches.length === 0 && (
        <p className="text-secondary text-center mt-4">No matches found. Please try different criteria.</p>
      )}
      {matches.length > 0 && (
        <div>
          <h2 className="mb-3">Top Matches</h2>
          {matches.map(creator => {
            // Find the most recent feedback for this creator
            const creatorFeedback = feedbackData.filter(f => f.creatorId === creator.id);
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
