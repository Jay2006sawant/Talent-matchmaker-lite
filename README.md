# Talent Matchmaker Lite

A beautiful, modern web app to match client briefs with the most relevant creators—built for BreadButter's Fullstack Internship Assignment.

---

## ✨ Features

- **Sleek, responsive UI** (React + Bootstrap, custom animations, accessibility)
- **Client brief form** with location, skills, budget, style preferences, and remote filter
- **Top 3 creator matches** with scores, rationale, portfolio links, and badges
- **Feedback loop**: Thumbs up/down on matches, with persistent match history
- **Show past feedback**: See your previous feedback on each creator
- **Fuzzy style/portfolio matching**: Smart, flexible matching using Jaccard similarity
- **Remote creators filter**: Instantly find creators available for remote work
- **Toast notifications** and microinteractions for a delightful UX

---

## 🚀 Quick Start

1. **Clone the repo**
2. **Install & run backend**
   ```sh
   cd Talent-matchmaker-lite/backend
   npm install
   node index.js
   ```
3. **Install & run frontend**
   ```sh
   cd ../frontend
   npm install
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🗂️ Project Structure

- `frontend/` — React app (UI, Bootstrap, custom CSS)
- `backend/` — Express server (API, matching logic)
- `backend/data/` — JSON data files (talent profiles, gigs, match history)

---

## 📦 Sample Data

- **Talent Profiles.json**
  ```json
  [
    { "id": 1, "name": "Aman Verma", "location": "Goa", "skills": ["portrait", ...], "tags": ["candid", ...], "budget_min": 50000, "budget_max": 100000, "portfolio": "...", "remote": true },
    ...
  ]
  ```
- **Gigs Dataset.json**
  ```json
  [
    { "id": 1, "location": "Goa", "skills_required": ["portrait", ...], "budget": 75000, "style_preferences": ["candid"] },
    ...
  ]
  ```
- **Match History.json**
  ```json
  [
    { "creatorId": 1, "feedback": "up", "timestamp": "..." },
    ...
  ]
  ```

---

## 🧠 Scoring Logic

| Rule                        | Score |
|-----------------------------|-------|
| Location match              | +3    |
| Budget within creator range | +2    |
| Each matching skill         | +2    |
| Each fuzzy style match      | +1    |

- **Fuzzy style match:** Uses Jaccard similarity for flexible, smart matching between client style preferences and creator tags.

---

## 💡 Bonus Features

- **Feedback loop:** Thumbs up/down on each match, stored in match history
- **Show past feedback:** See your previous feedback for each creator
- **Fuzzy style/portfolio matching:** Smarter, more flexible matching
- **Remote creators filter:** Instantly find remote-available creators
- **Beautiful UI:** Modern cards, avatars, badges, animations, and toasts
- **Accessibility:** Keyboard navigation, aria-labels, color contrast

---

## 🖼️ UI Highlights

- Modern, mobile-first design with Montserrat font and Bootstrap 5
- Animated card transitions, button effects, and toast notifications
- Avatars with creator initials, colored score and remote badges
- Floating labels and helper text for all form fields
- Fully responsive and accessible

---

## 🛠️ Tech Stack

- **Frontend:** React, Bootstrap 5, custom CSS, Montserrat font
- **Backend:** Node.js, Express
- **Storage:** JSON files (no database required)

---

## 📄 How to Use

1. Fill out the client brief form (location, skills, budget, style, remote)
2. Click **Find Matches**
3. View the top 3 matched creators, their scores, and why they were matched
4. Click 👍 or 👎 to give feedback (see your past feedback instantly)
5. Use the **Remote Only** filter to find remote creators

---

## 📣 Notes

- All data is stored locally in JSON files for easy testing and review
- The app is fully functional and ready for demo or deployment
