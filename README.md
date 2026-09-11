# Krish Lad — Frontend Developer Portfolio

A clean, modern 3D portfolio website built for **Krish Lad** using **React.js, JavaScript, React Router DOM, Three.js, React Three Fiber, and GSAP**. It features animated page sections, a custom 3D character scene, smooth route transitions, interactive physics-based skills stack, custom cursor interactions, and responsive design.

## Features

- **Pure React.js + JavaScript**: Modern JS & JSX architecture without TypeScript overhead.
- **React Router DOM**: Full client-side routing with routes for Home (`/`), About (`/about`), What I Do (`/what-i-do`), Career (`/career`), Work (`/work`), Skills (`/skills`), Contact (`/contact`), and 404 (`*`).
- **3D Character Scene**: Interactive 3D scene powered by React Three Fiber and Three.js with mouse and touch tracking.
- **Skills & Tech Stack**: Interactive 3D physics spheres and responsive cards showcase:
  - HTML
  - JavaScript
  - React JS
  - CSS
  - Tailwind CSS
  - Git
  - Vite
  - AI Tools
- **GSAP Animations**: Scroll-driven storytelling with GSAP, ScrollTrigger, and SplitText.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

## Tech Stack

### Core
- React 18
- React Router DOM 6
- Vite
- JavaScript (ES6+ / JSX)

### 3D & Animation
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/rapier`
- `@react-three/postprocessing`
- GSAP + `@gsap/react`

### Supporting Libraries
- `react-icons`
- `react-fast-marquee`
- `@vercel/analytics`

## Project Structure

```text
.
├── public/                    # Static assets, models, and images
│   ├── images/
│   ├── models/
│   ├── draco/
│   └── Krish_Lad.pdf
├── src/
│   ├── assets/                # Local assets
│   ├── components/            # Reusable UI & section components
│   │   ├── Character/         # 3D character model & animations
│   │   ├── styles/            # Component CSS stylesheets
│   │   ├── utils/             # GSAP & text animation utilities
│   │   ├── About.jsx
│   │   ├── Career.jsx
│   │   ├── Contact.jsx
│   │   ├── Cursor.jsx
│   │   ├── HoverLinks.jsx
│   │   ├── Landing.jsx
│   │   ├── Loading.jsx
│   │   ├── MainContainer.jsx
│   │   ├── Navbar.jsx
│   │   ├── SocialIcons.jsx
│   │   ├── TechStack.jsx
│   │   ├── WhatIDo.jsx
│   │   ├── Work.jsx
│   │   └── WorkImage.jsx
│   ├── context/               # Global state providers (loading state)
│   ├── data/                  # Static definitions (bone data, etc.)
│   ├── pages/                 # Dedicated React Router page views
│   │   ├── Home.jsx
│   │   ├── AboutPage.jsx
│   │   ├── WhatIDoPage.jsx
│   │   ├── CareerPage.jsx
│   │   ├── WorkPage.jsx
│   │   ├── SkillsPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── PageLayout.jsx
│   │   └── PageLayout.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the URL displayed in the terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Starts Vite dev server with host exposure.
- `npm run build`: Bundles the production application via Vite.
- `npm run preview`: Serves the production build locally.
- `npm run lint`: Runs ESLint checks.

## License

This project is open source and available under the [MIT License](LICENSE).
# KRISH-PORTFOLIO
# KRISH-PORTFOLIO
# KRISH-PORTFOLIO
