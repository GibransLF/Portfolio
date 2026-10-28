# Product Requirements Document (PRD)
## Personal Developer Portfolio Website

**Status:** Final  
**Project Type:** Static, single-page personal portfolio  
**Deployment:** GitHub Pages Project site  
**Repository Name:** `portfolio`  
**Website Language:** English

---

## 1. Project Overview

Build a clean, minimalist personal portfolio website for a Full Stack Developer, with a secondary focus on Backend Development and an interest in Data Analytics.

The website is intended for personal branding and to present the developer's profile, projects, skills, education, experience, and contact links.

The website must be easy to maintain, readable for other developers, responsive, and deployable as a static website through GitHub Pages.

### 1.1 Goals

- Present a professional developer profile and portfolio.
- Make projects and skills easy to browse.
- Keep content easy to update through JSON files without routinely editing Vue components.
- Provide a responsive and accessible user experience.
- Keep the implementation straightforward and avoid unnecessary complexity.
- Deploy reliably to GitHub Pages.

### 1.2 Non-goals

The website must not include:

- A backend, database, or server-side API.
- Login, authentication, or an admin dashboard.
- A CMS.
- A contact form that requires a backend.
- A CV/resume section or CV download.
- Individual project detail pages.
- Invented profile details, projects, experience, achievements, or links.

---

## 2. Technology Stack

Use the following stack:

- Vue 3
- Vite
- JavaScript only — do not use TypeScript.
- Tailwind CSS
- shadcn-vue — use Vue-compatible components, not React's shadcn/ui.
- GitHub Actions for deployment.
- GitHub Pages as the static hosting platform.

Use shadcn-vue's standard **Neutral** visual preset and design tokens. Do not introduce a custom accent palette unless explicitly requested later.

### 2.1 Existing Workspace and Dependency Handling

Before making changes, inspect the existing workspace, package files, and configuration.

- Preserve compatible existing setup and configuration.
- Do not recreate the project from scratch if a suitable Vue/Vite project already exists.
- Do not switch the project to React or add TypeScript.
- The user will manage installation of Vue and dependencies manually.
- Do not automatically reinstall or replace dependencies without first identifying what is already present and what is actually missing.
- Avoid unnecessary dependencies and overengineering.
- Use the installed versions and their compatible configuration where practical.

---

## 3. Site Structure

The website is a single-page portfolio with smooth-scrolling navigation and the following six sections, in this order:

1. Hero / Introduction
2. About Me
3. Projects
4. Skills
5. Experience & Education
6. Contact

There are no separate project detail pages.

### 3.1 Hero / Introduction

Display:

- Name
- Main role: Full Stack Developer
- Secondary focus: Backend Development
- Short introduction/summary
- Profile photo

Layout:

- On desktop, use a two-column layout with text and profile photo side by side.
- On mobile, place the profile photo above the text.
- Keep the layout clean, readable, and visually balanced.
- The profile photo must use a square 1:1 frame.

### 3.2 About Me

Display a short background and professional-interest description.

All content must come from `profile.json`.

### 3.3 Projects

Display all valid project entries from `projects.json`, in the order they appear in the JSON.

Each project card supports:

- Project title
- Short description
- Optional thumbnail image
- Technologies used
- GitHub repository URL

Requirements:

- Use simple, consistent project cards.
- Use a consistent thumbnail aspect ratio and `object-fit: cover` for valid images.
- The GitHub repository link is the primary action.
- Do not invent repository URLs or project information.
- Open external GitHub links in a new tab and use appropriate link security attributes.
- Hide optional elements when their values are empty.
- Do not limit the number of valid projects displayed.

### 3.4 Skills

Display skills grouped by category using simple badges.

Requirements:

- Skill data comes from `skills.json`.
- Display technology names only; do not add technology icons or logos.
- Do not use percentage bars, proficiency meters, or unsupported claims of skill level.
- Preserve category and item order from the JSON.

### 3.5 Experience & Education

Use a vertical timeline.

Include supported entries for:

- Formal education
- Professional work experience
- Internship / practical work experience

Certifications and relevant organizations or activities may be added later if real information is available.

Each entry can include:

- Type
- Title or position/degree
- Institution or organization
- Period
- Short summary
- Optional responsibilities
- Optional achievements
- Optional relevant technologies

Only display fields that have real content. Do not invent entries or claims.

The data comes from `experience-education.json`.

### 3.6 Contact

Display direct links for:

- Email
- GitHub
- LinkedIn

Actual addresses and profile URLs will be supplied later. Do not create fake links.

Do not add a backend-dependent contact form.

---

## 4. Visual Design and Theme

### 4.1 Design Direction

Use a clean, minimalist design based on shadcn-vue's standard Neutral theme.

- Use the default Neutral palette and design tokens.
- Avoid custom accent colors and unnecessary decorative effects.
- Use consistent spacing, typography, borders, and corner radii.
- Keep project cards simple.
- Ensure text and interactive controls remain readable in both themes.

Use shadcn-vue/Tailwind theme tokens rather than hardcoding colors throughout components. Examples include `bg-background`, `text-foreground`, `border-border`, and `bg-primary`, where supported by the installed configuration.

### 4.2 Dark and Light Modes

- Default to dark mode.
- Provide a visible control to switch between dark and light mode.
- Persist the visitor's selected theme using local storage.
- Apply theme changes consistently to backgrounds, text, borders, cards, and placeholders.
- Avoid a flash of the wrong theme on initial load where practical.

### 4.3 Responsive Layout

Use a mobile-first approach and support mobile phones, tablets, and desktop screens.

- Navigation must remain usable on small screens.
- Cards and content must reflow without horizontal overflow.
- Maintain readable text sizes and comfortable spacing.
- Preserve the profile photo's 1:1 ratio and project thumbnail ratios.

### 4.4 Motion

- Use subtle, lightweight reveal animations where appropriate.
- Do not overuse motion or make animation necessary to understand content.
- Respect the visitor's `prefers-reduced-motion` setting by reducing or disabling non-essential animation.
- Use smooth scrolling for in-page navigation.

---

## 5. Navigation and Interactions

- Provide navigation links for all six sections.
- Use smooth scrolling when a navigation item is selected.
- Provide a responsive mobile navigation menu.
- External GitHub and LinkedIn links open in a new tab.
- Provide a working dark/light theme toggle.
- Do not add a back-to-top button or active-section menu highlighting unless requested later.

All interactive controls must work and have accessible names and visible focus states.

---

## 6. Data and Content Management

Keep content separate from presentation through four JSON files:

```text
src/
└── data/
    ├── profile.json
    ├── projects.json
    ├── skills.json
    └── experience-education.json
```

The exact component implementation may be adapted to the existing workspace, but these four content files must remain the agreed source of portfolio content.

### 6.1 `profile.json`

Stores all profile content:

- `name`
- `role`
- `secondaryFocus`
- `interests`
- `photo`
- `summary`
- `about`
- Contact information or profile URLs as appropriate

Use clear, consistent field names. The exact schema may be adjusted during implementation if needed, but profile content must be editable in JSON rather than hardcoded across multiple components.

### 6.2 `projects.json`

Stores project information:

- `title`
- `description`
- `image` (optional)
- `technologies` (array)
- `githubUrl`

Additional fields should only be added if there is a clear requirement.

### 6.3 `skills.json`

Stores skill categories and their technology-name arrays. Preserve the order supplied in the JSON.

### 6.4 `experience-education.json`

Stores the entry type, title/position/degree, institution/organization, period, summary, and optional responsibilities, achievements, and technologies.

### 6.5 Data Handling Rules

- Render entries in the order they appear in JSON; do not automatically sort by date.
- Hide optional elements whose values are empty or missing.
- Skip invalid entries so valid entries can still render.
- Validate content during development/build where practical.
- Do not expose technical stack traces or raw validation errors to website visitors.
- Do not show empty sections or fabricated information merely to fill space.
- Do not add a CMS or admin interface.

---

## 7. Images and Missing Content

Use local image assets where possible. Do not use unrelated stock images or external image fallbacks.

Implement a reusable image component such as `ImageWithFallback.vue` to handle:

- An empty or missing image path.
- An image that fails to load.

When an image is unavailable:

- Display a neutral shadcn-vue-style placeholder.
- Show an `image-off` icon and the label "Image unavailable".
- Preserve the intended image frame and aspect ratio.
- Adapt the placeholder to the current light/dark theme.
- Do not show a broken-image icon or collapse the layout.

Use a 1:1 frame for the profile image and a consistent frame ratio for project thumbnails.

If profile or project content is not available yet, use a clearly identified placeholder or hide the optional element.

Never invent factual claims, project details, achievements, or URLs.

---

## 8. Accessibility

Meet basic accessibility expectations:

- Use semantic HTML elements.
- Maintain a logical heading hierarchy.
- Provide meaningful alt text for real images.
- Ensure keyboard navigation works.
- Provide visible focus indicators.
- Give interactive controls accessible names.
- Maintain adequate text and control contrast in both themes.
- Do not rely on color alone to communicate important information.
- Respect `prefers-reduced-motion`.
- Ensure the mobile navigation and theme toggle are usable with a keyboard and assistive technologies.

---

## 9. SEO and Metadata

Implement basic on-page SEO:

- A meaningful English page title.
- A concise meta description.
- Correct document language (`en`).
- Semantic HTML and a logical heading hierarchy.
- Open Graph metadata for social sharing.
- Appropriate metadata and canonical URL handling where a reliable public URL is available.
- Meaningful link text and image alt text.

Do not invent a domain or canonical URL before one is known.

SEO content must accurately describe the portfolio and must not contain fabricated experience or qualifications.

---

## 10. Performance and Maintainability

- Keep the site lightweight and avoid unnecessary libraries.
- Avoid unnecessary network requests.
- Optimize image dimensions and formats where practical.
- Avoid duplicated components and repeated styling when a small reusable component would help.
- Keep components and code straightforward and readable.
- Use comments where they clarify non-obvious behavior, not as a substitute for clear code.
- Avoid over-abstraction and unnecessary architectural patterns.
- Do not commit `node_modules/`.
- Keep dependency manifests and lockfiles under version control.
- Ensure the production build generates static assets suitable for GitHub Pages.

---

## 11. Suggested Folder Structure

Use this as a guide and adapt it to the existing workspace rather than forcing a full rewrite:

```text
portfolio/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ImageWithFallback.vue
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── ExperienceEducationSection.vue
│   │   └── ContactSection.vue
│   ├── data/
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── experience-education.json
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── docs.md
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── .github/
    └── workflows/
        └── deploy.yml
```

Only create files that are needed for the actual implementation. Follow the existing project's conventions when they are already compatible.

---

## 12. GitHub Pages Deployment

Deploy as a GitHub Pages Project site using the repository named `portfolio`.

### 12.1 Vite Base Path

Configure Vite's `base` path to match the repository name, normally:

```js
base: '/portfolio/'
```

Keep this value easy to update if the repository name changes.

Ensure local development and production asset paths work correctly.

### 12.2 GitHub Actions

Provide a GitHub Actions workflow that:

- Runs on pushes to the deployment branch, normally `main`.
- Checks out the repository.
- Sets up a compatible Node.js version.
- Installs dependencies using the committed lockfile.
- Runs the production build.
- Uploads the generated static build output.
- Deploys that output to GitHub Pages using the supported Pages deployment workflow.

Do not publish the raw source folder as the deployed site. Deploy the generated Vite build output, normally `dist/`.

Document any required GitHub Pages repository settings in `docs.md`.

Do not claim the site is deployed until the workflow has actually succeeded.

---

## 13. Documentation

Create `docs.md` explaining how another developer can understand and maintain the project.

Include:

- Project purpose and technology stack.
- How to run the project locally.
- How to run a production build.
- Folder and component responsibilities.
- The purpose and expected structure of each JSON file.
- How to add, edit, or remove projects, skills, experience, and profile content.
- How to add or replace image assets.
- How theme switching works.
- How to configure the Vite base path.
- How GitHub Actions and GitHub Pages deployment work.
- Any required repository settings.

Documentation should be clear and practical, not excessively long.

---

## 14. Acceptance Criteria

The implementation is complete only when the following checks pass.

### Content and Layout

- [ ] All six sections render in the agreed order.
- [ ] The site is a single page; projects do not open separate detail pages.
- [ ] Hero uses two columns on desktop and places the profile photo above the text on mobile.
- [ ] The profile image uses a square 1:1 frame.
- [ ] Project cards show all valid project entries in JSON order.
- [ ] Skills are grouped by category and use name-only badges.
- [ ] Experience & Education uses a vertical timeline.
- [ ] Contact shows Email, GitHub, and LinkedIn links only when valid values are supplied.
- [ ] No CV section or CV download is present.
- [ ] No fabricated content or fake links are present.

### Theme and Interactions

- [ ] Dark mode is the default.
- [ ] The dark/light toggle works and saves the visitor's choice.
- [ ] Theme tokens keep components consistent in both modes.
- [ ] Navigation uses smooth scrolling.
- [ ] The mobile navigation menu works.
- [ ] External GitHub and LinkedIn links open in a new tab securely.
- [ ] Subtle animations respect reduced-motion preferences.

### Data and Images

- [ ] All four JSON files are used as the content sources.
- [ ] Content order follows JSON order.
- [ ] Empty optional elements are hidden.
- [ ] Invalid entries are skipped without preventing valid entries from rendering.
- [ ] Empty or failed images show the neutral "Image unavailable" placeholder with an `image-off` icon.
- [ ] Image placeholders preserve the intended frame ratio and adapt to the theme.

### Quality and Deployment

- [ ] The layout works on mobile, tablet, and desktop without horizontal overflow.
- [ ] Basic keyboard accessibility, focus indicators, semantic HTML, and contrast are addressed.
- [ ] Basic SEO metadata is present and accurate.
- [ ] The production build succeeds.
- [ ] The Vite base path matches the `portfolio` repository path.
- [ ] GitHub Actions deploys the generated build output to GitHub Pages successfully.
- [ ] Deployed assets and in-page navigation work under the project-site path.
- [ ] `docs.md` explains setup, data editing, and deployment.

---

## 15. Implementation Guidance for Antigravity

1. Inspect the existing workspace before modifying files.
2. Compare the existing setup against this PRD and preserve compatible configuration.
3. Identify missing dependencies or configuration before proposing changes; do not blindly reinstall or replace the project.
4. Implement the agreed requirements using Vue 3, Vite, Tailwind CSS, shadcn-vue, and JavaScript.
5. Keep the implementation simple and maintainable.
6. Use the four JSON files for content and do not hardcode the same content across multiple components.
7. Do not fabricate missing portfolio details.
8. Test the production build and verify project-site asset paths.
9. Add `docs.md` and the GitHub Actions deployment workflow.
10. Summarize what was changed, what was tested, and any remaining manual steps. Do not claim successful deployment unless verified.

**End of PRD.**