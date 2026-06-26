# Implementation Plan: Earn With Barakah

Modern, mobile-first application to help Muslims discover halal online income opportunities. Clean green/white design, feature-rich but frontend-only for this session (localStorage for persistence).

## Scope Summary
- **App Name:** Earn With Barakah
- **Design:** Modern Islamic-inspired (Green/White/Gold), Mobile-first.
- **Core Features:** 
    - Auth (Mock/Local): Login/Registration.
    - Content: Featured articles, Categories (Freelancing, AI, Remote Jobs, etc.).
    - Search: Quick find for articles.
    - User Features: Bookmarks, Profile.
    - System Features: Dark mode, Push notification UI (simulated), Social Sharing.
    - Admin: Dashboard to manage (CRUD) articles (localStorage-backed).
    - Monetization: Google AdMob (Placeholder/UI integration).

## Non-Goals
- Real backend database (Supabase/Firebase).
- Real Push Notification service worker registration (UI only).
- Real Google AdMob SDK initialization (UI/Placeholder only).

## Assumptions & Open Questions
- **Persistence:** All data (articles, bookmarks, users) will be stored in `localStorage`.
- **Media:** Using placeholder images/icons for articles.
- **Theme:** Defaulting to Green (#1B5E20) and White, with gold accents.

## Affected Areas
- **Frontend Components:** New UI for Articles, Category Cards, Search, Profile, Admin Panel.
- **State Management:** LocalStorage-based stores for articles and user preferences.
- **Styling:** Tailwind CSS updates for the green/white theme and dark mode.
- **Routing:** React Router setup for all main views.

## Ordered Phases

### Phase 1: Foundation & Theme
- Setup routing (React Router).
- Configure Tailwind theme (Green/White palette, Dark mode).
- Create basic layout structure (Bottom Nav for mobile, Sidebar for desktop).
- **Owner:** frontend_engineer

### Phase 2: Data & Mock Services
- Define data structures for Articles and Categories.
- Initialize `localStorage` with seed data for articles.
- Create mock Auth and Article service layers.
- **Owner:** frontend_engineer

### Phase 3: Core UI (Home, Search, Categories)
- Implement Home page with featured article carousel.
- Implement Category listing and filtered views.
- Implement Search bar and results.
- **Owner:** frontend_engineer

### Phase 4: User Features (Profile, Bookmarks, Dark Mode)
- Implement Bookmark functionality and saved items page.
- Create User Profile page.
- Add Dark Mode toggle.
- Implement Social Sharing button UI.
- **Owner:** frontend_engineer

### Phase 5: Admin Dashboard (CRUD)
- Create Admin login (simplified).
- Create Dashboard for listing articles.
- Create Forms for Adding/Editing/Deleting articles.
- **Owner:** frontend_engineer

### Phase 6: Final Polish & Monetization UI
- Add AdMob placeholder blocks (simulated banners).
- Add Push notification request UI/simulation.
- Final CSS/Responsive polish for mobile/tablet.
- **Owner:** quick_fix_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the core application structure, theme, and feature set.
2. quick_fix_engineer — Handle final polish and minor UI adjustments.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5
- **Scope:** Build the entire Earn With Barakah application. Use `localStorage` for all "database" needs (articles, bookmarks, user data). Ensure a green/white Islamic aesthetic.
- **Files:** 
    - `src/App.tsx` (Routing)
    - `src/components/layout/` (Nav, BottomBar)
    - `src/pages/` (Home, Search, Category, Profile, Admin)
    - `src/lib/data.ts` (Mock seed data & storage logic)
- **Acceptance criteria:**
    - App is responsive and looks mobile-first.
    - Users can "register" and "login" (local only).
    - Articles can be searched and filtered by category.
    - Bookmarking works across refreshes.
    - Admin dashboard allows creating/editing/deleting articles.

### 2. quick_fix_engineer
- **Phases:** 6
- **Scope:** Refine styles, add AdMob placeholders, and handle push notification UI simulation.
- **Files:** `src/components/ui/`, `src/index.css`
- **Depends on:** frontend_engineer
- **Acceptance criteria:**
    - Ad placeholders are visible in the layout.
    - Theme colors are consistent.
    - Responsive behavior is smooth on all breakpoints.
