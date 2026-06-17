# AGENTS.md

Welcome, AI coding agents! This file provides essential technical context, setup instructions, development workflows, and code guidelines for working on the **Nafta Trading** project.

---

## Project Overview

- **Description**: A corporate web platform for "Nafta Trading LLC" (ОСОО "НАФТА ТРЕЙДИНГ").
- **Core Technology Stack**:
  - HTML5 with PostHTML (`posthtml-include`) for components, layouts, and partial views.
  - Vanilla CSS (CSS Variables, nesting, Flexbox/Grid).
  - Vanilla JavaScript (ESM modules).
  - Bundler & Compiler: Parcel (used to compile CSS and JS modules).
  - Formatting: Prettier.
- **Key Client-Side Libraries**:
  - `a11y-dialog` (modal dialogs)
  - `accordion-js` (accordions)
  - `aos` (scroll animations)
  - `imask` (input masks)
  - `just-validate` (form validation)
  - `nouislider` (range sliders)
  - `swiper` (carousels/sliders)
  - `toastify-js` (toast notifications)

---

## Project Directory Structure

```
├── .dev/                   # Temporary dev server build cache (CSS, JS)
├── dist/                   # Production build output (generated on build)
├── public/                 # Static assets copied directly to dist (favicon, etc.)
├── scripts/                # Node build and development scripts
└── src/                    # Main source files
    ├── assets/             # Raw stylesheets, scripts, and media files
    │   ├── css/            # CSS files (index.css imports others)
    │   │   ├── sections/   # Component/section-specific stylesheets
    │   │   ├── base.css    # Global resets and shared classes (.button, etc.)
    │   │   └── variable.css# CSS variables (colors, fonts, metrics)
    │   └── js/             # ESM files (index.js imports others)
    │       └── modules/    # JS modules (header, modal, slider, dynamicAdapt)
    ├── pages/              # HTML pages (processed into build files)
    └── partials/           # HTML parts (header, footer, modals, sprite)
        └── sections/       # HTML components for page sections
```

---

## Setup & Setup Commands

This project uses `npm` as the package manager. Ensure Node.js (version 18+) is installed.

- **Install dependencies**:
  ```bash
  npm install
  ```

---

## Development Workflow

### Starting the Development Environment

Run the following command to start Parcel watchers and the local development server:
```bash
npm run dev
```
- **Local Dev Server URL**: `http://localhost:1234`
- **Port Conflict**: If port `1234` is already in use, the dev server script will fail with `EADDRINUSE`. Ensure no other processes are running on port `1234`.
- **Live Reload**: The dev server injects a live-reload script and automatically refreshes when HTML, CSS, JS, or assets change.

### Formatting & Linting

All files are formatted using Prettier.
- **Format code**:
  ```bash
  npm run format
  ```
- **Check formatting**:
  ```bash
  npm run format:check
  ```

---

## Key Custom Utilities

### 1. Dynamic Adapt (DOM Reordering)
We use a custom responsive utility in [dynamicAdapt.js](file:///d:/Developer/Kwork/nafta_trading/src/assets/js/modules/dynamicAdapt.js) to dynamically move elements inside the DOM based on viewport size.
- **Usage**: Add `data-da="[destination-selector], [breakpoint], [order]"` to the element.
- **Example**: `data-da=".header__menu-body, 1150, first"` moves the element to `.header__menu-body` when viewport width is `<= 1150px` as the first child.

### 2. PostHTML Includes
We use `posthtml-include` to insert partials into main pages.
- **Syntax**: 
  ```html
  <include src="../partials/header.html" locals='{"header_class": ""}'></include>
  ```

---

## Code Style & Architecture Guidelines

1. **Strict DRY and SOLID Principles**:
   - Do not write duplicate CSS or JavaScript styles.
   - Utilize CSS variables defined in [variable.css](file:///d:/Developer/Kwork/nafta_trading/src/assets/css/variable.css) for colors, fonts, and transitons.
   - Enforce component-driven development. Shared styles (like `.button`) must be modified globally in `base.css` rather than overriding them inline.

2. **Semantic HTML**:
   - Maintain strict accessible tags (`<header>`, `<nav>`, `<footer>`, `<main>`, `<button>` for actions, `<a>` for navigation).
   - Use `aria-label` and `aria-hidden` attributes appropriately to support screen readers.

3. **CSS Conventions**:
   - Use BEM (Block, Element, Modifier) naming conventions (e.g., `.header__burger--active`).
   - Group component styles in `src/assets/css/sections/` and import them in `src/assets/css/index.css`.

4. **JavaScript Conventions**:
   - Modules should export initialization functions (e.g., `initHeader()`, `initModal()`).
   - Add checks to prevent runtime errors when elements are not present on a page (e.g., `if (!element) return;`).

---

## Build & Production Deployment

To compile and optimize assets for production:
```bash
npm run build
```
This runs the full build sequence:
1. `npm run build:css` — Compiles CSS using Parcel and outputs to `dist/css/`.
2. `npm run build:js` — Bundles ESM code using Parcel and outputs to `dist/js/`.
3. `npm run build:assets` — Copies static assets (images, fonts, videos) to `dist/`.
4. `npm run build:html` — Injects partials, builds output HTML, and saves to `dist/`.
5. `npm run build:cleanup` — Cleans empty directories in the bundle path.
