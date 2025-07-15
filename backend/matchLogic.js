// Scoring and matching logic for Talent Matchmaker Lite

// Jaccard similarity for fuzzy matching
function jaccardSimilarity(arr1, arr2) {
  const set1 = new Set(arr1.map(s => s.toLowerCase()));
  const set2 = new Set(arr2.map(s => s.toLowerCase()));
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

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
  // Fuzzy style match using Jaccard similarity
  let styleMatches = 0;
  (brief.style_preferences || []).forEach(stylePref => {
    creator.tags.forEach(tag => {
      if (jaccardSimilarity([stylePref], [tag]) >= 0.5) {
        styleMatches++;
      }
    });
  });
  if (styleMatches > 0) {
    score += styleMatches * 1;
    rationale.push(`${styleMatches} fuzzy style match(es) (+${styleMatches})`);
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