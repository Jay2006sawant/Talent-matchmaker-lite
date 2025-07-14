// Scoring and matching logic for Talent Matchmaker Lite

// Score a single creator against a client brief
function scoreMatch(creator, brief) {
  let score = 0;
  let rationale = [];
  // Location match
  if (creator.location === brief.location) {
    score += 3;
    rationale.push('Location match (+3)');
  }
  // Budget match
  if (brief.budget >= creator.budget_min && brief.budget <= creator.budget_max) {
    score += 2;
    rationale.push('Budget match (+2)');
  }
  // Skills match
  let skillMatches = creator.skills.filter(skill => brief.skills_required.includes(skill));
  if (skillMatches.length > 0) {
    score += skillMatches.length * 2;
    rationale.push(`${skillMatches.length} skill(s) matched (+${skillMatches.length * 2})`);
  }
  // Style match
  let styleMatches = creator.tags.filter(tag => (brief.style_preferences || []).includes(tag));
  if (styleMatches.length > 0) {
    score += styleMatches.length * 1;
    rationale.push(`${styleMatches.length} style keyword(s) matched (+${styleMatches.length})`);
  }
  return {
    ...creator,
    score,
    rationale: rationale.join(', ')
  };
}

// Get top N matches for a client brief
function getTopMatches(talentProfiles, brief, topN = 3) {
  const results = talentProfiles.map(creator => scoreMatch(creator, brief));
  return results.sort((a, b) => b.score - a.score).slice(0, topN);
}

module.exports = { scoreMatch, getTopMatches }; 