// Express server setup for Talent Matchmaker Lite
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');
const { getTopMatches } = require('./matchLogic');

// Directory containing sample data files
const DATA_DIR = path.join(__dirname, 'data');

// Helper to load JSON data from file
function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
}

// Safe loader with error handling
function safeLoadJson(filename) {
  try {
    return loadJson(filename);
  } catch (err) {
    console.error(`Error loading ${filename}:`, err.message);
    return null;
  }
}

// Load data at startup
let talentProfiles = safeLoadJson('Talent Profiles.json') || [];
let gigsDataset = safeLoadJson('Gigs Dataset.json') || [];
let matchHistory = safeLoadJson('Match History.json') || [];

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Endpoint to get all talent profiles
app.get('/api/talent-profiles', (req, res) => {
  res.json(talentProfiles);
});

// Endpoint to get all gigs
app.get('/api/gigs', (req, res) => {
  res.json(gigsDataset);
});

// Matchmaking endpoint: receives client brief, returns top 3 matches
app.post('/api/match', (req, res) => {
  const brief = req.body;
  // Validate input
  if (!brief || !brief.location || !brief.budget || !Array.isArray(brief.skills_required)) {
    return res.status(400).json({ error: 'Missing or invalid client brief fields.' });
  }
  if (!talentProfiles.length) {
    return res.status(500).json({ error: 'Talent profiles data not available.' });
  }
  // Filter for remote creators if requested
  let filteredProfiles = talentProfiles;
  if (brief.remoteOnly) {
    filteredProfiles = talentProfiles.filter(c => c.remote === true);
  }
  // Use refactored logic to get top matches
  const top3 = getTopMatches(filteredProfiles, brief, 3);
  res.json(top3);
});

// Feedback endpoint: receives feedback and stores in Match History.json
app.post('/api/feedback', (req, res) => {
  const { creatorId, feedback } = req.body;
  if (!creatorId || !['up', 'down'].includes(feedback)) {
    return res.status(400).json({ error: 'Invalid feedback data.' });
  }
  const entry = {
    creatorId,
    feedback,
    timestamp: new Date().toISOString()
  };
  // Load current match history
  let matchHistory = safeLoadJson('Match History.json') || [];
  matchHistory.push(entry);
  // Save back to file
  try {
    fs.writeFileSync(path.join(DATA_DIR, 'Match History.json'), JSON.stringify(matchHistory, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving feedback:', err.message);
    res.status(500).json({ error: 'Failed to save feedback.' });
  }
});

// Endpoint to get all feedback from Match History.json
app.get('/api/feedback', (req, res) => {
  try {
    const matchHistory = safeLoadJson('Match History.json') || [];
    res.json(matchHistory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load feedback.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 