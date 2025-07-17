import React, { useState } from 'react';
import ClientBriefForm from './components/ClientBriefForm';
import MatchResultCard from './components/MatchResultCard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'form', 'results'
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }

      const data = await response.json();
      setMatches(data);
      setCurrentPage('results');
    } catch (err) {
      setError('Failed to fetch matches');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (creatorId, feedback) => {
    try {
      await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ creatorId, feedback }),
      });
    } catch (err) {
      console.error('Error sending feedback:', err);
    }
  };

  const handleFormChange = () => {
    if (error) setError('');
  };

  const navigateToForm = () => {
    setCurrentPage('form');
    setMatches([]);
    setError('');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setMatches([]);
    setError('');
  };

  // Home Page Component
  const HomePage = () => (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in-up">
          <h1 className="hero-title">Find the Best Creative Talent</h1>
          <p className="hero-subtitle">
            Connect with photographers, videographers, and creative professionals for your next project. 
            Get matched with the perfect talent based on your specific requirements.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <button className="btn btn-primary" onClick={navigateToForm}>
              Start Matching
            </button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mt-4">
        <div className="text-center mb-4">
          <h2 className="fade-in-up">Why Choose Talent Matchmaker?</h2>
          <p className="text-secondary">Advanced AI-powered matching for your creative projects</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card fade-in-up">
            <div className="feature-icon">🎯</div>
            <h3>Smart Matching</h3>
            <p className="text-secondary">Our AI analyzes your requirements and finds the perfect talent match.</p>
          </div>
          
          <div className="feature-card fade-in-up">
            <div className="feature-icon">✅</div>
            <h3>Verified Talent</h3>
            <p className="text-secondary">All creators are vetted and have proven track records.</p>
          </div>
          
          <div className="feature-card fade-in-up">
            <div className="feature-icon">⚡</div>
            <h3>Quick Results</h3>
            <p className="text-secondary">Get matched with top talent in seconds, not days.</p>
          </div>
        </div>
      </section>
    </div>
  );

  // Form Page Component
  const FormPage = () => (
    <main className="container page-transition">
      <div className="form-page-header">
        <button className="btn btn-back mb-3" onClick={navigateToHome}>
          ← Back to Home
        </button>
        <h1 className="form-page-title">Project Brief</h1>
        <p className="form-page-subtitle">Tell us about your project to find the perfect match</p>
      </div>
      
      <ClientBriefForm onSubmit={handleFormSubmit} onFormChange={handleFormChange} />
    </main>
  );

  // Results Page Component
  const ResultsPage = () => (
    <main className="container page-transition">
      <div className="results-header">
        <div className="nav-buttons">
          <button className="btn btn-back" onClick={navigateToHome}>
            ← Back to Home
          </button>
          <button className="btn btn-back" onClick={navigateToForm}>
            New Search
          </button>
        </div>
        <h1 className="results-title">Your Matches</h1>
        <p className="results-subtitle">We found {matches.length} perfect matches for your project</p>
      </div>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}

      {error && (
        <div className="card slide-in-left">
          <div className="text-center text-secondary">
            <p>{error}</p>
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div className="fade-in-up">
          {matches.map((creator, index) => (
            <MatchResultCard
              key={creator.id}
              creator={creator}
              onFeedback={handleFeedback}
            />
          ))}
        </div>
      )}

      {!loading && !error && matches.length === 0 && (
        <div className="card slide-in-left">
          <div className="text-center text-secondary">
            <p>No matches found. Try adjusting your criteria.</p>
          </div>
        </div>
      )}
    </main>
  );

  return (
    <div className="App">
      {/* Fixed Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
              Talent Matchmaker
            </div>
            <div className="d-flex gap-3">
              <button className="btn btn-outline btn-sm">Browse Talent</button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'form' && <FormPage />}
      {currentPage === 'results' && <ResultsPage />}

      {/* Footer */}
      <footer className="mt-4 mb-4">
        <div className="container">
          <div className="text-center text-secondary">
            <p>&copy; 2024 Talent Matchmaker. Built with ❤️ for creative professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
