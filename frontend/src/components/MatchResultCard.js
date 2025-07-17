import React, { useState } from 'react';

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

export default function MatchResultCard({ creator, onFeedback, previousFeedback }) {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handlePortfolioClick = () => {
    if (creator.portfolio && creator.portfolio.length > 0) {
      setShowPortfolio(!showPortfolio);
    }
  };

  return (
    <div className="match-card">
      <div className="d-flex align-items-center">
        <div className="avatar">
          {getInitials(creator.name)}
        </div>
        
        <div className="match-info">
          <div className="d-flex align-items-center">
            <h5 className="match-name mb-0">{creator.name}</h5>
            <span className="match-score">Score: {creator.score}</span>
          </div>
          
          <p className="match-reason mb-3">{creator.rationale}</p>
          
          {/* Portfolio Button */}
          {creator.portfolio && creator.portfolio.length > 0 && (
            <button 
              onClick={handlePortfolioClick}
              className="btn btn-outline btn-sm"
            >
              Portfolio ({creator.portfolio.length} items)
            </button>
          )}
          
          {previousFeedback && (
            <span className="badge badge-info ms-2">
              Previous feedback: {previousFeedback === 'up' ? '👍' : '👎'}
            </span>
          )}
          
          {/* Portfolio Details */}
          {showPortfolio && creator.portfolio && (
            <div className="portfolio-section">
              <h6 className="mb-3">Portfolio Items:</h6>
              {creator.portfolio.map((item, index) => (
                <div key={index} className="portfolio-item">
                  <div className="portfolio-title">{item.title}</div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="portfolio-tags">
                      Tags: {item.tags.join(', ')}
                    </div>
                  )}
                  {item.keywords && item.keywords.length > 0 && (
                    <div className="portfolio-tags">
                      Keywords: {item.keywords.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="feedback-buttons">
            <button
              type="button"
              className="feedback-btn up"
              title="Thumbs Up"
              aria-label={`Give thumbs up feedback for ${creator.name}`}
              onClick={() => onFeedback && onFeedback(creator.id, 'up')}
            >
              👍
            </button>
            <button
              type="button"
              className="feedback-btn down"
              title="Thumbs Down"
              aria-label={`Give thumbs down feedback for ${creator.name}`}
              onClick={() => onFeedback && onFeedback(creator.id, 'down')}
            >
              👎
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 