// Scoring and matching logic for Talent Matchmaker Lite

// Jaccard similarity for fuzzy matching
function jaccardSimilarity(arr1, arr2) {
  const set1 = new Set(arr1.map(s => s.toLowerCase()));
  const set2 = new Set(arr2.map(s => s.toLowerCase()));
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

// Normalize skills for better matching
function normalizeSkill(skill) {
  return skill.toLowerCase().replace(/[^a-z]/g, '');
}

// Check if skills match (with fuzzy matching)
function skillsMatch(creatorSkills, briefSkills) {
  const normalizedCreatorSkills = creatorSkills.map(normalizeSkill);
  const normalizedBriefSkills = briefSkills.map(normalizeSkill);
  
  // Direct matches
  const directMatches = normalizedBriefSkills.filter(briefSkill => 
    normalizedCreatorSkills.some(creatorSkill => creatorSkill.includes(briefSkill) || briefSkill.includes(creatorSkill))
  );
  
  // Fuzzy matches using Jaccard similarity
  let fuzzyMatches = 0;
  normalizedBriefSkills.forEach(briefSkill => {
    normalizedCreatorSkills.forEach(creatorSkill => {
      if (jaccardSimilarity([briefSkill], [creatorSkill]) >= 0.3) {
        fuzzyMatches++;
      }
    });
  });
  
  return directMatches.length + fuzzyMatches;
}

// Score a single creator against a client brief
function scoreMatch(creator, brief) {
  let score = 0;
  let rationale = [];
  
  // Location match
  if (creator.city && brief.location && creator.city.toLowerCase() === brief.location.toLowerCase()) {
    score += 3;
    rationale.push('Location match (+3)');
  }
  
  // Budget match - parse budget range
  if (brief.budget && creator.budget_range) {
    const budgetRange = creator.budget_range.replace(/[^\d-]/g, '');
    const [minBudget, maxBudget] = budgetRange.split('–').map(b => parseInt(b.replace(/[^\d]/g, '')));
    
    if (minBudget && maxBudget && brief.budget >= minBudget && brief.budget <= maxBudget) {
      score += 2;
      rationale.push('Budget match (+2)');
    }
  }
  
  // Skills match with improved logic
  if (creator.skills && brief.skills_required && brief.skills_required.length > 0) {
    const skillMatches = skillsMatch(creator.skills, brief.skills_required);
    if (skillMatches > 0) {
      score += skillMatches * 2;
      rationale.push(`${skillMatches} skill(s) matched (+${skillMatches * 2})`);
    }
  }
  
  // Style preferences match
  if (brief.style_preferences && brief.style_preferences.length > 0) {
    let styleMatches = 0;
    brief.style_preferences.forEach(stylePref => {
      // Check against style_tags
      if (creator.style_tags) {
        creator.style_tags.forEach(tag => {
          if (jaccardSimilarity([stylePref], [tag]) >= 0.5) {
            styleMatches++;
          }
        });
      }
      // Check against portfolio keywords
      if (creator.portfolio) {
        creator.portfolio.forEach(portfolio => {
          if (portfolio.keywords) {
            portfolio.keywords.forEach(keyword => {
              if (jaccardSimilarity([stylePref], [keyword]) >= 0.5) {
                styleMatches++;
              }
            });
          }
        });
      }
    });
    
    if (styleMatches > 0) {
      score += styleMatches * 1;
      rationale.push(`${styleMatches} style preference(s) matched (+${styleMatches})`);
    }
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
  // Only return matches with score > 0
  const filtered = results.filter(r => r.score > 0);
  return filtered.sort((a, b) => b.score - a.score).slice(0, topN);
}

module.exports = { scoreMatch, getTopMatches }; 