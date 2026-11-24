# DokkhoNagorik: A Skill-to-Income SaaS Ecosystem

> **"Learn with direction. Prove your skills. Earn with confidence."**

DokkhoNagorik is a production-grade, responsive SaaS web application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. It connects ambitious individuals developing real-world professional skills with small and medium enterprises (SMEs) that need verified project delivery.

---

## 🚀 Key Architectural Highlights

1. **Dual Growth Engine (Learner ↔ Earner)**:
   - **Learners**: Discover high-demand domains, follow structured milestone-based roadmaps, complete client-realistic practice projects, and build verifiable case studies.
   - **Earners**: Showcase published case studies, explore smart rule-based recommendations, apply to vetted SME contracts, collaborate in multidisciplinary squads, and collect simulated milestone escrow payouts in BDT (৳).
   - **SME Businesses**: Post projects with milestone deliverables, inspect candidate case studies, hire individual or team talent, review live prototypes, and approve escrow disbursements.
   - **Platform Admin**: Superuser moderation panel for inspecting registered users, monitoring project listings, and verifying dispute queues.

2. **No Dead Buttons or Static Screens**:
   - Every single button, form submission, filter, and task checkbox interacts with our **reactive mock-data store** persisted directly in `localStorage`.
   - Ready for drop-in Supabase PostgreSQL + Auth integration.

3. **Deterministic Matching Engine**:
   - Rule-based explainable score:
     - 40% Skill match
     - 25% Portfolio case study relevance
     - 15% Experience tier
     - 10% Weekly availability
     - 10% Budget compatibility in BDT (৳)

4. **Floating Live Demo Switcher**:
   - A floating switcher is docked at the bottom-right corner of every screen, allowing instantaneous 1-click persona toggling across **Learner**, **Earner**, **Business**, and **Admin**.
   - Includes a **"Reset Data"** button to restore seed states at any point.

---

## 🔐 Demo Credentials

All demo accounts share the password: `demo1234`

| Persona | Name | Email | Purpose |
| :--- | :--- | :--- | :--- |
| **Learner** | Tanvir Ahmed | `learner@dokkhonagorik.demo` | Explore roadmaps, complete practice projects, check Readiness Score |
| **Earner** | Sabbir Hossain | `earner@dokkhonagorik.demo` | Search SME projects, apply with case studies, deliver milestones |
| **Business SME** | Pathao Logistics / Smart SME | `business@dokkhonagorik.demo` | Post projects, review applicants, approve milestones & release escrow |
| **Admin** | Platform Superadmin | `admin@dokkhonagorik.demo` | Moderation queue, user directory, system health |

---

## 🧪 End-to-End Test Scenarios

### Scenario A: Learner to Earner Transition
1. Visit `/login` and select **Learner Account** (or click Register).
2. Go to **My Roadmap** (`/learner/roadmap`): Check off tasks or add personal learning notes.
3. Open **Practice Projects** (`/learner/practice`):
   - Click **Submit Work** on an active project (e.g. *Local Artisan E-Commerce Checkout Flow*).
   - Enter your prototype URL and approach notes, then submit.
   - Click **Import to Portfolio** to convert it directly into a published case study!
4. Navigate to **Become an Earner** (`/learner/become-earner`):
   - Review your automated **Readiness Score** and checklist criteria.
   - Click **Activate Earner Profile Now** to seamlessly unlock Earner capabilities.
5. Explore **Recommended Projects** (`/earner/recommended`) and apply to a matched SME project.

### Scenario B: Business to Project Completion & Escrow Payout
1. Switch role to **Business** via the bottom-right floating switcher (or log in with `business@dokkhonagorik.demo`).
2. Go to **Post a Project** (`/business/post-project`):
   - Complete the 6-step form and click **Publish to Marketplace**.
3. Open **Applications** (`/business/applications`):
   - Review Sabbir Hossain's proposal and attached case study.
   - Click **Accept & Hire** to automatically generate active milestone escrow contracts!
4. Go to **Manage Projects** (`/business/projects`):
   - View submitted milestone deliverables (e.g., *Milestone 2: High-Fidelity UI*).
   - Click **Approve & Release Payment** (releases simulated ৳15,000 escrow).
5. Switch to **Earner** (`/earner/earnings`):
   - Verify that the cleared earnings ledger shows the updated balance and transaction reference!

---

## 🛠 Local Setup & Development

```bash
# Clone the repository
git clone <repo-url>
cd DokkhoNagorik

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view DokkhoNagorik in your browser.
