# Talent Matchmaker Lite

A web app to match client briefs with the most relevant creators.

## Project Structure

- `frontend/` — React app for the UI
- `backend/` — Express server for matchmaking API

## Setup

1. `cd frontend && npm install && npm start` — Start frontend
2. `cd backend && npm install && node index.js` — Start backend

## Features

- Input client brief
- Get top 3 matched creators with scores and rationale

## Data

- Sample data in JSON files (to be added)

---

## Scoring Logic

- Location match: +3
- Budget match: +2
- Each matching skill: +2
- Each matching style: +1 