export type Role = "learner" | "earner" | "business" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  country: string;
  role: Role;
  hasEarnerProfile?: boolean;
  hasLearnerProfile?: boolean;
  createdAt: string;
}

export interface LearnerProfile {
  userId: string;
  ageRange?: string;
  educationLevel?: string;
  occupation?: string;
  interests: string[];
  skills: { name: string; level: "Beginner" | "Intermediate" | "Advanced" }[];
  goals: string[];
  hoursPerWeek: number;
  learningFormat: string;
  budgetPreference: "free" | "flexible";
  targetDomain: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  notes?: string;
  resourceUrls?: { title: string; url: string }[];
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "locked";
  tasks: RoadmapTask[];
}

export interface Roadmap {
  id: string;
  userId: string;
  domain: string;
  title: string;
  description: string;
  progressPercent: number;
  isPaused: boolean;
  phases: RoadmapPhase[];
}

export interface LearningResource {
  id: string;
  title: string;
  category: "Articles" | "YouTube tutorials" | "Documentation" | "Free courses" | "Practice websites" | "Books" | "Tools";
  domain: string;
  skill: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  url: string;
  isPaid: boolean;
  estimatedTime: string;
  bookmarked?: boolean;
  completed?: boolean;
}

export interface PracticeProject {
  id: string;
  title: string;
  domain: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  requiredSkills: string[];
  estimatedTime: string;
  deliverables: string[];
  evaluationCriteria: string[];
  status?: "not_started" | "in_progress" | "completed";
  submissionNotes?: string;
  submissionUrl?: string;
  addedToPortfolio?: boolean;
}

export interface PortfolioProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  problemStatement: string;
  approach: string;
  skillsUsed: string[];
  toolsUsed: string[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  completionDate: string;
  keyOutcomes: string;
  isPublished: boolean;
}

export interface EarnerProfile {
  userId: string;
  title: string;
  bio: string;
  skills: { name: string; level: "Beginner" | "Intermediate" | "Advanced" }[];
  hourlyRateBDT?: number;
  expectedProjectBudgetBDT: number;
  availability: "Full-time" | "Part-time (20h/wk)" | "Weekends & Evenings";
  preferredProjectTypes: string[];
  workPreference: "Individual" | "Team" | "Both";
  readinessScore: number;
  readinessFeedback: string[];
  rating: number;
  reviewsCount: number;
}

export interface MarketplaceProject {
  id: string;
  businessId: string;
  businessName: string;
  businessLogo?: string;
  businessIndustry: string;
  title: string;
  category: string;
  description: string;
  requiredSkills: string[];
  experienceLevel: "Entry" | "Intermediate" | "Expert";
  workType: "Remote" | "Hybrid" | "Onsite";
  collaborationType: "Individual" | "Team" | "Either";
  budgetBDT: number;
  budgetType: "fixed" | "range";
  budgetMaxBDT?: number;
  duration: string;
  deadline: string;
  postedDate: string;
  deliverables: string[];
  acceptanceCriteria: string[];
  applicantCount: number;
  status: "open" | "in_progress" | "completed";
}

export interface ProjectApplication {
  id: string;
  projectId: string;
  projectTitle: string;
  businessId: string;
  businessName: string;
  earnerId: string;
  earnerName: string;
  earnerTitle: string;
  coverMessage: string;
  proposedBudgetBDT: number;
  estimatedCompletionTime: string;
  portfolioProjectId?: string;
  relevantSkills: string[];
  status: "Submitted" | "Under Review" | "Shortlisted" | "Accepted" | "Rejected" | "Withdrawn";
  appliedDate: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  amountBDT: number;
  deadline: string;
  status: "pending" | "submitted" | "approved" | "revision_requested";
  deliverableUrl?: string;
  submissionNotes?: string;
}

export interface ActiveProject {
  id: string;
  projectId: string;
  projectTitle: string;
  businessId: string;
  businessName: string;
  earnerId: string;
  earnerName: string;
  role: string;
  deadline: string;
  status: "in_progress" | "completed";
  clientFeedback?: string;
  milestones: ProjectMilestone[];
  totalBudgetBDT: number;
}

export interface Transaction {
  id: string;
  userId: string;
  projectId: string;
  projectTitle: string;
  type: "earning" | "spending";
  amountBDT: number;
  status: "completed" | "pending";
  date: string;
  reference: string;
}

export interface Review {
  id: string;
  projectId: string;
  projectTitle: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface TeamMember {
  userId: string;
  name: string;
  role: "Team Leader" | "Developer" | "Designer" | "Researcher" | "Content Specialist" | "Project Manager";
  avatar?: string;
  joinedDate: string;
}

export interface Team {
  id: string;
  creatorId: string;
  name: string;
  tagline: string;
  description: string;
  skills: string[];
  members: TeamMember[];
  projectsCompleted: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "roadmap" | "resource" | "match" | "application" | "milestone" | "review" | "payment" | "system";
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface AssessmentSubmission {
  id: string;
  userId: string;
  domain: string;
  score: number;
  level: "Foundational" | "Practitioner" | "Job-Ready";
  completedAt: string;
}
