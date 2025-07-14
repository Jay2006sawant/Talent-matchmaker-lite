const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
}

let talentProfiles = loadJson('Talent Profiles.json');
let gigsDataset = loadJson('Gigs Dataset.json');
let matchHistory = loadJson('Match History.json');

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 