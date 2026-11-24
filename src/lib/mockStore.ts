import {
  User,
  LearnerProfile,
  EarnerProfile,
  Roadmap,
  LearningResource,
  PracticeProject,
  PortfolioProject,
  MarketplaceProject,
  ProjectApplication,
  ActiveProject,
  Transaction,
  Review,
  Team,
  Notification
} from "@/types";
import {
  initialUsers,
  initialLearnerProfiles,
  initialEarnerProfiles,
  initialRoadmaps,
  initialResources,
  initialPracticeProjects,
  initialPortfolioProjects,
  initialMarketplaceProjects,
  initialApplications,
  initialActiveProjects,
  initialTransactions,
  initialReviews,
  initialTeams,
  initialNotifications
} from "./seedData";

const STORAGE_KEYS = {
  CURRENT_USER: "dokkhonagorik_current_user",
  USERS: "dokkhonagorik_users",
  LEARNER_PROFILES: "dokkhonagorik_learner_profiles",
  EARNER_PROFILES: "dokkhonagorik_earner_profiles",
  ROADMAPS: "dokkhonagorik_roadmaps",
  RESOURCES: "dokkhonagorik_resources",
  PRACTICE_PROJECTS: "dokkhonagorik_practice_projects",
  PORTFOLIO_PROJECTS: "dokkhonagorik_portfolio_projects",
  MARKETPLACE_PROJECTS: "dokkhonagorik_marketplace_projects",
  APPLICATIONS: "dokkhonagorik_applications",
  ACTIVE_PROJECTS: "dokkhonagorik_active_projects",
  TRANSACTIONS: "dokkhonagorik_transactions",
  REVIEWS: "dokkhonagorik_reviews",
  TEAMS: "dokkhonagorik_teams",
  NOTIFICATIONS: "dokkhonagorik_notifications",
  DEMO_SEEDED: "dokkhonagorik_seeded_v1"
};

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error reading ${key}`, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key}`, e);
  }
}

export function initializeMockStore(): void {
  if (typeof window === "undefined") return;

  const seeded = localStorage.getItem(STORAGE_KEYS.DEMO_SEEDED);
  if (!seeded) {
    setItem(STORAGE_KEYS.USERS, initialUsers);
    setItem(STORAGE_KEYS.CURRENT_USER, initialUsers[0]); // default to learner
    setItem(STORAGE_KEYS.LEARNER_PROFILES, initialLearnerProfiles);
    setItem(STORAGE_KEYS.EARNER_PROFILES, initialEarnerProfiles);
    setItem(STORAGE_KEYS.ROADMAPS, initialRoadmaps);
    setItem(STORAGE_KEYS.RESOURCES, initialResources);
    setItem(STORAGE_KEYS.PRACTICE_PROJECTS, initialPracticeProjects);
    setItem(STORAGE_KEYS.PORTFOLIO_PROJECTS, initialPortfolioProjects);
    setItem(STORAGE_KEYS.MARKETPLACE_PROJECTS, initialMarketplaceProjects);
    setItem(STORAGE_KEYS.APPLICATIONS, initialApplications);
    setItem(STORAGE_KEYS.ACTIVE_PROJECTS, initialActiveProjects);
    setItem(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
    setItem(STORAGE_KEYS.REVIEWS, initialReviews);
    setItem(STORAGE_KEYS.TEAMS, initialTeams);
    setItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
    localStorage.setItem(STORAGE_KEYS.DEMO_SEEDED, "true");
  }
}

export const mockStore = {
  // Reset all to demo seed
  resetStore(): void {
    if (typeof window === "undefined") return;
    localStorage.clear();
    initializeMockStore();
  },

  // Auth & Users
  getCurrentUser(): User | null {
    return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, initialUsers[0]);
  },

  setCurrentUser(user: User): void {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },

  getUsers(): User[] {
    return getItem<User[]>(STORAGE_KEYS.USERS, initialUsers);
  },

  loginAs(email: string): User | null {
    const users = this.getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      this.setCurrentUser(found);
      return found;
    }
    return null;
  },

  registerUser(name: string, email: string, country: string, role: User["role"]): User {
    const users = this.getUsers();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      country,
      role,
      hasLearnerProfile: role === "learner",
      hasEarnerProfile: role === "earner",
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  },

  // Learner profile
  getLearnerProfile(userId: string): LearnerProfile | null {
    const profiles = getItem<Record<string, LearnerProfile>>(STORAGE_KEYS.LEARNER_PROFILES, initialLearnerProfiles);
    return profiles[userId] || null;
  },

  saveLearnerProfile(profile: LearnerProfile): void {
    const profiles = getItem<Record<string, LearnerProfile>>(STORAGE_KEYS.LEARNER_PROFILES, initialLearnerProfiles);
    profiles[profile.userId] = profile;
    setItem(STORAGE_KEYS.LEARNER_PROFILES, profiles);

    // ensure user flag
    const users = this.getUsers();
    const user = users.find((u) => u.id === profile.userId);
    if (user) {
      user.hasLearnerProfile = true;
      setItem(STORAGE_KEYS.USERS, users);
    }
  },

  // Earner profile
  getEarnerProfile(userId: string): EarnerProfile | null {
    const profiles = getItem<Record<string, EarnerProfile>>(STORAGE_KEYS.EARNER_PROFILES, initialEarnerProfiles);
    return profiles[userId] || null;
  },

  saveEarnerProfile(profile: EarnerProfile): void {
    const profiles = getItem<Record<string, EarnerProfile>>(STORAGE_KEYS.EARNER_PROFILES, initialEarnerProfiles);
    profiles[profile.userId] = profile;
    setItem(STORAGE_KEYS.EARNER_PROFILES, profiles);

    // update user object
    const users = this.getUsers();
    const user = users.find((u) => u.id === profile.userId);
    if (user) {
      user.hasEarnerProfile = true;
      if (user.role === "learner") {
        // can transition or stay dual
      }
      setItem(STORAGE_KEYS.USERS, users);
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === profile.userId) {
        currentUser.hasEarnerProfile = true;
        this.setCurrentUser(currentUser);
      }
    }
  },

  // Roadmaps
  getRoadmap(userId: string): Roadmap | null {
    const roadmaps = getItem<Record<string, Roadmap>>(STORAGE_KEYS.ROADMAPS, initialRoadmaps);
    return roadmaps[userId] || initialRoadmaps["user-learner-1"];
  },

  updateRoadmapTask(userId: string, phaseId: string, taskId: string, completed: boolean, notes?: string): void {
    const roadmaps = getItem<Record<string, Roadmap>>(STORAGE_KEYS.ROADMAPS, initialRoadmaps);
    let roadmap = roadmaps[userId] || initialRoadmaps["user-learner-1"];

    let totalTasks = 0;
    let completedTasks = 0;

    const newPhases = roadmap.phases.map((phase) => {
      if (phase.id === phaseId) {
        const updatedTasks = phase.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed, notes: notes !== undefined ? notes : task.notes };
          }
          return task;
        });
        const allCompleted = updatedTasks.every((t) => t.completed);
        return {
          ...phase,
          status: allCompleted ? ("completed" as const) : ("in_progress" as const),
          tasks: updatedTasks
        };
      }
      return phase;
    });

    newPhases.forEach((p) => {
      p.tasks.forEach((t) => {
        totalTasks++;
        if (t.completed) completedTasks++;
      });
    });

    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    roadmap = { ...roadmap, phases: newPhases, progressPercent };
    roadmaps[userId] = roadmap;
    setItem(STORAGE_KEYS.ROADMAPS, roadmaps);
  },

  togglePauseRoadmap(userId: string): boolean {
    const roadmaps = getItem<Record<string, Roadmap>>(STORAGE_KEYS.ROADMAPS, initialRoadmaps);
    const roadmap = roadmaps[userId] || initialRoadmaps["user-learner-1"];
    roadmap.isPaused = !roadmap.isPaused;
    roadmaps[userId] = roadmap;
    setItem(STORAGE_KEYS.ROADMAPS, roadmaps);
    return roadmap.isPaused;
  },

  // Resources
  getResources(): LearningResource[] {
    return getItem<LearningResource[]>(STORAGE_KEYS.RESOURCES, initialResources);
  },

  toggleBookmarkResource(resourceId: string): void {
    const resources = this.getResources();
    const updated = resources.map((r) => (r.id === resourceId ? { ...r, bookmarked: !r.bookmarked } : r));
    setItem(STORAGE_KEYS.RESOURCES, updated);
  },

  toggleCompleteResource(resourceId: string): void {
    const resources = this.getResources();
    const updated = resources.map((r) => (r.id === resourceId ? { ...r, completed: !r.completed } : r));
    setItem(STORAGE_KEYS.RESOURCES, updated);
  },

  // Practice Projects
  getPracticeProjects(): PracticeProject[] {
    return getItem<PracticeProject[]>(STORAGE_KEYS.PRACTICE_PROJECTS, initialPracticeProjects);
  },

  updatePracticeProjectStatus(
    projectId: string,
    status: PracticeProject["status"],
    notes?: string,
    submissionUrl?: string
  ): void {
    const projects = this.getPracticeProjects();
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          status,
          submissionNotes: notes !== undefined ? notes : p.submissionNotes,
          submissionUrl: submissionUrl !== undefined ? submissionUrl : p.submissionUrl
        };
      }
      return p;
    });
    setItem(STORAGE_KEYS.PRACTICE_PROJECTS, updated);
  },

  // Portfolio
  getPortfolioProjects(userId?: string): PortfolioProject[] {
    const projects = getItem<PortfolioProject[]>(STORAGE_KEYS.PORTFOLIO_PROJECTS, initialPortfolioProjects);
    if (userId) {
      return projects.filter((p) => p.userId === userId);
    }
    return projects;
  },

  addPortfolioProject(project: Omit<PortfolioProject, "id">): PortfolioProject {
    const projects = this.getPortfolioProjects();
    const newProject: PortfolioProject = {
      ...project,
      id: `port-${Date.now()}`
    };
    projects.unshift(newProject);
    setItem(STORAGE_KEYS.PORTFOLIO_PROJECTS, projects);
    return newProject;
  },

  updatePortfolioProject(project: PortfolioProject): void {
    const projects = this.getPortfolioProjects();
    const updated = projects.map((p) => (p.id === project.id ? project : p));
    setItem(STORAGE_KEYS.PORTFOLIO_PROJECTS, updated);
  },

  deletePortfolioProject(id: string): void {
    const projects = this.getPortfolioProjects();
    const updated = projects.filter((p) => p.id !== id);
    setItem(STORAGE_KEYS.PORTFOLIO_PROJECTS, updated);
  },

  // Marketplace Projects
  getMarketplaceProjects(): MarketplaceProject[] {
    return getItem<MarketplaceProject[]>(STORAGE_KEYS.MARKETPLACE_PROJECTS, initialMarketplaceProjects);
  },

  addMarketplaceProject(project: Omit<MarketplaceProject, "id" | "postedDate" | "applicantCount" | "status">): MarketplaceProject {
    const projects = this.getMarketplaceProjects();
    const newProject: MarketplaceProject = {
      ...project,
      id: `proj-${Date.now()}`,
      postedDate: new Date().toISOString().split("T")[0],
      applicantCount: 0,
      status: "open"
    };
    projects.unshift(newProject);
    setItem(STORAGE_KEYS.MARKETPLACE_PROJECTS, projects);
    return newProject;
  },

  // Project Applications
  getApplications(): ProjectApplication[] {
    return getItem<ProjectApplication[]>(STORAGE_KEYS.APPLICATIONS, initialApplications);
  },

  submitApplication(app: Omit<ProjectApplication, "id" | "status" | "appliedDate">): ProjectApplication {
    const applications = this.getApplications();
    const newApp: ProjectApplication = {
      ...app,
      id: `app-${Date.now()}`,
      status: "Submitted",
      appliedDate: new Date().toISOString()
    };
    applications.unshift(newApp);
    setItem(STORAGE_KEYS.APPLICATIONS, applications);

    // increment project applicants
    const projects = this.getMarketplaceProjects();
    const project = projects.find((p) => p.id === app.projectId);
    if (project) {
      project.applicantCount += 1;
      setItem(STORAGE_KEYS.MARKETPLACE_PROJECTS, projects);
    }

    // notify business
    this.addNotification({
      userId: app.businessId,
      title: "New Application Received",
      message: `${app.earnerName} submitted a proposal for "${app.projectTitle}".`,
      type: "application",
      link: "/business/applications"
    });

    return newApp;
  },

  updateApplicationStatus(appId: string, status: ProjectApplication["status"]): void {
    const applications = this.getApplications();
    let updatedApp: ProjectApplication | undefined;
    const updated = applications.map((a) => {
      if (a.id === appId) {
        updatedApp = { ...a, status };
        return updatedApp;
      }
      return a;
    });
    setItem(STORAGE_KEYS.APPLICATIONS, updated);

    if (updatedApp) {
      // notify earner
      this.addNotification({
        userId: updatedApp.earnerId,
        title: `Application ${status}`,
        message: `Your application for "${updatedApp.projectTitle}" has been marked as ${status}.`,
        type: "application",
        link: status === "Accepted" ? "/earner/active-projects" : "/earner/applications"
      });

      // If accepted, instantiate active project automatically
      if (status === "Accepted") {
        const activeProjects = this.getActiveProjects();
        const existing = activeProjects.find((ap) => ap.projectId === updatedApp?.projectId && ap.earnerId === updatedApp?.earnerId);
        if (!existing) {
          const newActive: ActiveProject = {
            id: `act-${Date.now()}`,
            projectId: updatedApp.projectId,
            projectTitle: updatedApp.projectTitle,
            businessId: updatedApp.businessId,
            businessName: updatedApp.businessName,
            earnerId: updatedApp.earnerId,
            earnerName: updatedApp.earnerName,
            role: updatedApp.earnerTitle || "Specialist",
            deadline: "2026-12-30",
            status: "in_progress",
            totalBudgetBDT: updatedApp.proposedBudgetBDT,
            milestones: [
              {
                id: `ms-${Date.now()}-1`,
                title: "Milestone 1: Project Discovery & Architecture",
                description: "Initial discovery, wireframes/specifications, and scope confirmation.",
                amountBDT: Math.round(updatedApp.proposedBudgetBDT * 0.4),
                deadline: "2026-12-10",
                status: "pending"
              },
              {
                id: `ms-${Date.now()}-2`,
                title: "Milestone 2: Final Delivery & Review",
                description: "Delivery of all production assets and acceptance verification.",
                amountBDT: Math.round(updatedApp.proposedBudgetBDT * 0.6),
                deadline: "2026-12-25",
                status: "pending"
              }
            ]
          };
          activeProjects.unshift(newActive);
          setItem(STORAGE_KEYS.ACTIVE_PROJECTS, activeProjects);
        }
      }
    }
  },

  // Active Projects
  getActiveProjects(): ActiveProject[] {
    return getItem<ActiveProject[]>(STORAGE_KEYS.ACTIVE_PROJECTS, initialActiveProjects);
  },

  submitMilestone(activeProjectId: string, milestoneId: string, deliverableUrl: string, notes?: string): void {
    const projects = this.getActiveProjects();
    const updated = projects.map((p) => {
      if (p.id === activeProjectId) {
        const ms = p.milestones.map((m) => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: "submitted" as const,
              deliverableUrl,
              submissionNotes: notes
            };
          }
          return m;
        });
        return { ...p, milestones: ms };
      }
      return p;
    });
    setItem(STORAGE_KEYS.ACTIVE_PROJECTS, updated);
  },

  approveMilestone(activeProjectId: string, milestoneId: string): void {
    const projects = this.getActiveProjects();
    let approvedAmount = 0;
    let businessId = "";
    let earnerId = "";
    let projectTitle = "";
    let projectId = "";

    const updated = projects.map((p) => {
      if (p.id === activeProjectId) {
        businessId = p.businessId;
        earnerId = p.earnerId;
        projectTitle = p.projectTitle;
        projectId = p.projectId;

        const ms = p.milestones.map((m) => {
          if (m.id === milestoneId) {
            approvedAmount = m.amountBDT;
            return { ...m, status: "approved" as const };
          }
          return m;
        });

        // check if all milestones approved
        const allDone = ms.every((m) => m.status === "approved");
        return {
          ...p,
          status: allDone ? ("completed" as const) : p.status,
          milestones: ms
        };
      }
      return p;
    });
    setItem(STORAGE_KEYS.ACTIVE_PROJECTS, updated);

    // record simulated transactions
    if (approvedAmount > 0) {
      const txs = this.getTransactions();
      const txEarner: Transaction = {
        id: `tx-${Date.now()}-e`,
        userId: earnerId,
        projectId,
        projectTitle,
        type: "earning",
        amountBDT: approvedAmount,
        status: "completed",
        date: new Date().toISOString(),
        reference: `SB-TXN-${Math.floor(100000 + Math.random() * 900000)} (Milestone Approved)`
      };
      const txBusiness: Transaction = {
        id: `tx-${Date.now()}-b`,
        userId: businessId,
        projectId,
        projectTitle,
        type: "spending",
        amountBDT: approvedAmount,
        status: "completed",
        date: new Date().toISOString(),
        reference: `SB-ESC-${Math.floor(100000 + Math.random() * 900000)} (Payment Released)`
      };
      txs.unshift(txEarner, txBusiness);
      setItem(STORAGE_KEYS.TRANSACTIONS, txs);

      // notify earner
      this.addNotification({
        userId: earnerId,
        title: "Payment Released!",
        message: `৳${approvedAmount.toLocaleString()} has been credited to your earnings for "${projectTitle}".`,
        type: "payment",
        link: "/earner/earnings"
      });
    }
  },

  // Transactions
  getTransactions(userId?: string): Transaction[] {
    const txs = getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
    if (userId) {
      return txs.filter((t) => t.userId === userId);
    }
    return txs;
  },

  // Reviews
  getReviews(userId?: string): Review[] {
    const reviews = getItem<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
    if (userId) {
      return reviews.filter((r) => r.toUserId === userId || r.fromUserId === userId);
    }
    return reviews;
  },

  addReview(review: Omit<Review, "id" | "createdAt">): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newReview);
    setItem(STORAGE_KEYS.REVIEWS, reviews);
    return newReview;
  },

  // Teams
  getTeams(): Team[] {
    return getItem<Team[]>(STORAGE_KEYS.TEAMS, initialTeams);
  },

  createTeam(team: Omit<Team, "id" | "projectsCompleted">): Team {
    const teams = this.getTeams();
    const newTeam: Team = {
      ...team,
      id: `team-${Date.now()}`,
      projectsCompleted: 0
    };
    teams.push(newTeam);
    setItem(STORAGE_KEYS.TEAMS, teams);
    return newTeam;
  },

  addTeamMember(teamId: string, member: Team["members"][0]): void {
    const teams = this.getTeams();
    const updated = teams.map((t) => {
      if (t.id === teamId) {
        return { ...t, members: [...t.members, member] };
      }
      return t;
    });
    setItem(STORAGE_KEYS.TEAMS, updated);
  },

  // Notifications
  getNotifications(userId: string): Notification[] {
    const notifs = getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
    return notifs.filter((n) => n.userId === userId);
  },

  addNotification(notif: Omit<Notification, "id" | "createdAt" | "read">): void {
    const notifs = getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random()}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    notifs.unshift(newNotif);
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  },

  markNotificationsRead(userId: string): void {
    const notifs = getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
    const updated = notifs.map((n) => (n.userId === userId ? { ...n, read: true } : n));
    setItem(STORAGE_KEYS.NOTIFICATIONS, updated);
  }
};
