const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');
const { getTopMatches } = require('./matchLogic');

const DATA_DIR = path.join(__dirname, 'data');

function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
}

// Improved error handling for data loading
function safeLoadJson(filename) {
  try {
    return loadJson(filename);
  } catch (err) {
    console.error(`Error loading ${filename}:`, err.message);
    return null;
  }
}

let talentProfiles = safeLoadJson('Talent Profiles.json') || [];
let gigsDataset = safeLoadJson('Gigs Dataset.json') || [];
let matchHistory = safeLoadJson('Match History.json') || [];

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/talent-profiles', (req, res) => {
  res.json(talentProfiles);
});

app.get('/api/gigs', (req, res) => {
  res.json(gigsDataset);
});

app.post('/api/match', (req, res) => {
  const brief = req.body;
  if (!brief || !brief.location || !brief.budget || !Array.isArray(brief.skills_required)) {
    return res.status(400).json({ error: 'Missing or invalid client brief fields.' });
  }
  if (!talentProfiles.length) {
    return res.status(500).json({ error: 'Talent profiles data not available.' });
  }
  const top3 = getTopMatches(talentProfiles, brief, 3);
  res.json(top3);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 