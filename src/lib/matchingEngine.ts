import { EarnerProfile, MarketplaceProject, PortfolioProject } from "@/types";

export interface MatchScoreResult {
  overallScore: number;
  breakdown: {
    skillMatch: number; // 40% weight
    portfolioRelevance: number; // 25% weight
    experienceMatch: number; // 15% weight
    availabilityMatch: number; // 10% weight
    budgetCompatibility: number; // 10% weight
  };
  reasons: string[];
}

export function calculateMatchScore(
  earner: EarnerProfile,
  project: MarketplaceProject,
  portfolio: PortfolioProject[]
): MatchScoreResult {
  const reasons: string[] = [];

  // 1. Skill Match (40%)
  const projectSkills = project.requiredSkills.map((s) => s.toLowerCase());
  const earnerSkills = earner.skills.map((s) => s.name.toLowerCase());
  const matchedSkills = projectSkills.filter((ps) =>
    earnerSkills.some((es) => es.includes(ps) || ps.includes(es))
  );

  const skillMatchRatio = projectSkills.length > 0 ? matchedSkills.length / projectSkills.length : 0.8;
  const skillMatch = Math.min(100, Math.round(skillMatchRatio * 100));

  if (matchedSkills.length > 0) {
    reasons.push(`Direct skill overlap on ${matchedSkills.length} required skill(s)`);
  }

  // 2. Portfolio Relevance (25%)
  let portfolioRelevance = 40; // baseline
  const relevantPort = portfolio.filter((p) =>
    p.skillsUsed.some((s) => projectSkills.some((ps) => s.toLowerCase().includes(ps))) ||
    project.category.toLowerCase().includes("design") && p.title.toLowerCase().includes("dashboard") ||
    project.category.toLowerCase().includes("web") && p.skillsUsed.includes("React / Next.js")
  );

  if (relevantPort.length >= 2) {
    portfolioRelevance = 95;
    reasons.push(`${relevantPort.length} published case studies aligned with project scope`);
  } else if (relevantPort.length === 1) {
    portfolioRelevance = 80;
    reasons.push(`1 relevant case study in portfolio ("${relevantPort[0].title}")`);
  } else {
    reasons.push("Foundational portfolio project ready for review");
  }

  // 3. Experience Match (15%)
  let experienceMatch = 70;
  if (project.experienceLevel === "Entry") {
    experienceMatch = 95;
    reasons.push("Tailored for high-performing graduates and emerging talent");
  } else if (project.experienceLevel === "Intermediate") {
    experienceMatch = earner.readinessScore > 80 ? 90 : 75;
  } else {
    experienceMatch = earner.readinessScore > 90 ? 85 : 60;
  }

  // 4. Availability Match (10%)
  let availabilityMatch = 85;
  if (earner.availability.includes("20h") || earner.availability.includes("Full-time")) {
    availabilityMatch = 95;
    reasons.push(`Earner availability (${earner.availability}) satisfies project cadence`);
  }

  // 5. Budget Compatibility (10%)
  let budgetCompatibility = 80;
  const projectBudget = project.budgetBDT;
  if (projectBudget >= earner.expectedProjectBudgetBDT * 0.8) {
    budgetCompatibility = 95;
    reasons.push(`Budget of ৳${projectBudget.toLocaleString()} aligns with target rates`);
  } else {
    budgetCompatibility = 70;
  }

  // Weighted formula
  // Score = 0.40 * skill + 0.25 * portfolio + 0.15 * experience + 0.10 * availability + 0.10 * budget
  const overallScore = Math.round(
    skillMatch * 0.4 +
    portfolioRelevance * 0.25 +
    experienceMatch * 0.15 +
    availabilityMatch * 0.1 +
    budgetCompatibility * 0.1
  );

  return {
    overallScore: Math.min(99, Math.max(50, overallScore)),
    breakdown: {
      skillMatch,
      portfolioRelevance,
      experienceMatch,
      availabilityMatch,
      budgetCompatibility
    },
    reasons
  };
}
