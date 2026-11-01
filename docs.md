# Project Documentation: Developer Portfolio

A clean, minimalist personal portfolio website built with Vue 3, Vite, and Tailwind CSS (shadcn Neutral preset). Designed for deployment as a static site via GitHub Pages.

---

## 1. Project Overview & Tech Stack

This website serves as a single-page personal developer portfolio for a **Full Stack Developer** with a focus on **Backend Development** and an interest in **Data Analytics**.

### Technology Stack
- **Framework:** [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool:** [Vite](https://vite.dev/)
- **Language:** JavaScript (ES Modules, pure JS — no TypeScript)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with shadcn-vue Neutral design tokens
- **Icons:** [@lucide/vue](https://lucide.dev/) + inline brand SVGs
- **Deployment:** GitHub Pages via GitHub Actions

---

## 2. Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- `npm` (v10 or higher)

### Installation
Clone the repository and install dependencies using the committed lockfile:
```bash
npm ci
```

### Running the Development Server
Start the Vite local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173/portfolio/` (or the URL displayed in the terminal).

### Production Build & Preview
To build the static files:
```bash
npm run build
```
The static output will be generated in the `dist/` folder.

To test the generated production build locally:
```bash
npm run preview
```

---

## 3. Project Structure & Responsibilities

```text
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   ├── images/                 # Local image assets (profile photo, project thumbnails)
│   ├── favicon.svg             # Website favicon
│   └── icons.svg
├── src/
│   ├── assets/                 # Static asset imports
│   ├── components/
│   │   ├── icons/              # Scalable SVG brand icons (GitHub, LinkedIn)
│   │   │   ├── GithubIcon.vue
│   │   │   └── LinkedinIcon.vue
│   │   ├── Footer.vue          # Semantic footer with dynamic copyright year
│   │   ├── ImageWithFallback.vue # Reusable image component with fallback placeholder
│   │   ├── Navbar.vue          # Sticky header with smooth-scrolling & mobile menu
│   │   └── ThemeToggle.vue     # Accessible dark/light mode toggle button
│   ├── composables/
│   │   └── useTheme.js         # Reactive theme management & localStorage persistence
│   ├── data/                   # Content source files (JSON)
│   │   ├── profile.json        # Bio, hero text, and direct contact URLs
│   │   ├── projects.json       # Array of project cards
│   │   ├── skills.json         # Array of categorized technical proficiencies
│   │   ├── experience.json     # Professional work and internship timeline
│   │   ├── education.json      # Formal education history (SMK, University)
│   │   └── certificates.json   # Certifications, licenses, and course credentials
│   ├── lib/
│   │   └── utils.js            # Class merger utility helper (cn)
│   ├── sections/               # The single-page sections (rendered in order)
│   │   ├── HeroSection.vue     # Intro with two-column desktop layout & 1:1 photo
│   │   ├── AboutSection.vue    # Detailed background and professional interests
│   │   ├── ProjectsSection.vue # Project cards with multi-image hover slideshow & detail preview modal
│   │   ├── SkillsSection.vue   # Grouped skills badges (names only, no icons/bars)
│   │   ├── ExperienceSection.vue # Vertical timeline for work history
│   │   ├── EducationSection.vue  # Vertical timeline for education background
│   │   ├── CertificatesSection.vue # Responsive cards with 3-item pagination & image preview/zoom modal
│   │   └── ContactSection.vue  # Direct links to Email, GitHub, and LinkedIn
│   ├── App.vue                 # Root component assembling all sections
│   ├── main.js                 # App entry point
│   └── style.css               # Tailwind CSS imports & theme variables
├── checklist.md                # Task checklist & acceptance tracking
├── docs.md                     # Maintenance & architectural documentation
├── index.html                  # HTML entry point with SEO metadata & anti-flash script
├── package.json
├── package-lock.json
└── vite.config.js              # Vite configuration (base path & path aliases)
```

---

## 4. Managing Content via JSON (`src/data/`)

All portfolio content is separated from presentation. To update website content, modify the corresponding JSON files in `src/data/`:

### 4.1 `profile.json`
Contains developer profile details and contact links:
```json
{
  "name": "Your Name",
  "role": "Full Stack Developer",
  "secondaryFocus": "Backend Development",
  "interests": ["Data Analytics", "System Architecture"],
  "photo": "images/profile.png",
  "summary": "Short 1-2 sentence introduction displayed in Hero.",
  "about": "Full paragraph background displayed in About Me.",
  "contacts": {
    "email": "your.email@example.com",
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername"
  }
}
```
*Note: If `email`, `github`, or `linkedin` is empty, its button will automatically be hidden in the Contact section.*

### 4.2 `projects.json`
Array of project entries displayed in the order they appear (supports dynamic multi-image gallery per project):
```json
[
  {
    "title": "Project Title",
    "description": "Short project description.",
    "images": [
      "src/assets/projects/1.png",
      "src/assets/projects/2.png"
    ],
    "technologies": ["Vue 3", "Node.js", "PostgreSQL"],
    "githubUrl": "https://github.com/yourusername/repo"
  }
]
```
*Note: `images` is a dynamic array of image paths (with `images[0]` as the primary thumbnail). On card hover, it immediately transitions to image 2 and starts an auto-slideshow. Clicking a card opens a full modal preview with full un-truncated description, thumbnail strip, and gallery navigation.*

### 4.3 `skills.json`
Skills grouped by category:
```json
[
  {
    "category": "Backend Development",
    "items": ["Node.js", "Express.js", "Go", "PostgreSQL"]
  }
]
```
*Note: PRD rules require technology names only. Do not add technology logos or proficiency percentage meters.*

### 4.4 `experience.json`
Vertical timeline items for work and internships. The `type` field is displayed directly as a badge label (e.g., `"Full-Time"`, `"Internship"`, `"Contract"`, `"Freelance"`):
```json
[
  {
    "type": "Full-Time",
    "title": "Full Stack Developer",
    "company": "Tech Solution Studio",
    "period": "2023 - Present",
    "summary": "Building and maintaining full stack web applications.",
    "responsibilities": ["Design RESTful services", "Optimize queries"],
    "achievements": ["Reduced latency by 35%"],
    "technologies": ["Vue 3", "Node.js", "PostgreSQL"]
  }
]
```

### 4.5 `education.json`
Vertical timeline items for formal academic and vocational qualifications. The `grade` field allows flexible label formatting (e.g. `"GPA: 3.85 / 4.00"`, `"Final Score: 88.5 / 100"`):
```json
[
  {
    "institution": "University Faculty of Computer Science",
    "degree": "Bachelor of Computer Science (S1)",
    "period": "2019 - 2023",
    "grade": "GPA: 3.85 / 4.00",
    "description": "Graduated with honors. Completed coursework in Algorithms and Software Engineering."
  },
  {
    "institution": "SMK Negeri 1",
    "degree": "Rekayasa Perangkat Lunak (RPL)",
    "period": "2016 - 2019",
    "grade": "Final Score: 88.5 / 100"
  }
]
```

### 4.6 `certificates.json`
Grid cards for certifications, credentials, and licenses with 3-item-per-page pagination and lightbox preview:
```json
[
  {
    "title": "AWS Certified Solutions Architect – Associate",
    "issuer": "Amazon Web Services",
    "date": "Nov 2024 – Nov 2027",
    "image": "/images/certificates/aws-csa.png",
    "skills": ["Cloud Architecture", "AWS"]
  },
  {
    "title": "Menjadi Front-End Web Developer Expert",
    "issuer": "Dicoding Indonesia",
    "date": "Jan 2023",
    "image": "/images/certificates/dicoding-frontend.png"
  }
]
```

---

## 5. Adding and Replacing Images

Store local images in `public/images/`.

### Setting a Profile Photo
1. Place your square photo at `public/images/profile.png`.
2. In `src/data/profile.json`, set:
   ```json
   "photo": "images/profile.png"
   ```
3. Vite serves assets from `public/` at the base URL, which works seamlessly with GitHub Pages.

### Adding Project Thumbnails
1. Place thumbnail images (recommended aspect ratio: 16:9) in `public/images/` or `src/assets/projects/`.
2. Reference the paths in `src/data/projects.json` within the `images` array:
   ```json
   "images": [
     "src/assets/projects/1.png",
     "src/assets/projects/2.png"
   ]
   ```
3. If an image path is invalid or the image fails to load, `ImageWithFallback.vue` will catch the error and display a neutral placeholder with an `image-off` icon and *"Image unavailable"* label without breaking the layout.

---

## 6. Theme Switching & Anti-Flash Implementation

- **Default Theme:** Dark mode (`.dark` on `<html>`).
- **Persistence:** Selected theme (`'dark'` or `'light'`) is saved in `localStorage` under the key `portfolio-theme`.
- **Anti-Flash Mechanism:** In `index.html`, an inline script executes before the DOM renders:
  ```html
  <script>
    (function () {
      try {
        const theme = localStorage.getItem('portfolio-theme') || 'dark';
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        document.documentElement.classList.add('dark');
      }
    })();
  </script>
  ```
- **Motion Preferences:** The application respects `prefers-reduced-motion: reduce`. When active, smooth scrolling and CSS transitions are neutralized.

---

## 7. Vite Base Path Configuration

To deploy on GitHub Pages as a project site (`https://<username>.github.io/<repo-name>/`), the base path is set in `vite.config.js`:
```javascript
export default defineConfig({
  base: '/portfolio/',
  // ...
})
```
*If you rename your repository, update `base: '/<new-repo-name>/'` accordingly.*

---

## 8. GitHub Actions & GitHub Pages Deployment

### Workflow Overview (`.github/workflows/deploy.yml`)
The automated CI/CD pipeline triggers on every push to the `main` branch:
1. Checks out the code.
2. Sets up Node.js 20 with npm caching.
3. Installs dependencies using `npm ci`.
4. Builds the production static bundle using `npm run build` (outputs to `dist/`).
5. Uploads the `dist/` directory as a GitHub Pages artifact.
6. Deploys the artifact to GitHub Pages.

### Required Repository Settings (One-Time Setup on GitHub)
When you are ready to publish the website on GitHub:
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages** (under Code and automation).
3. Under **Build and deployment**:
   - Set **Source** to **GitHub Actions**.
4. Push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: complete portfolio implementation"
   git push origin main
   ```
5. The GitHub Actions workflow will automatically run, build, and deploy the site.
