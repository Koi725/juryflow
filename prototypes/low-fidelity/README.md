# JuryFlow - low-fidelity prototype

Non-functional, greyscale wireframes of the main JuryFlow screens (Phase 3 deliverable). Navigation between screens works; nothing is saved and no backend is called. All content comes from `src/data/`.

Stack: Next.js (App Router, static export), TypeScript, Tailwind CSS, Vitest + React Testing Library, Playwright for screenshots.

## Run

```bash
cd prototypes/low-fidelity
npm install
npm run dev          # http://localhost:3000
```

Static export (served from `out/`):

```bash
npm run build
npm start            # http://localhost:3000
```

## Tests

```bash
npm test             # Vitest, one render test per screen plus shared components
npm run typecheck
```

## Screenshots

From the repository root:

```bash
./scripts/capture-prototype.sh
```

Installs dependencies if needed, installs Chromium for Playwright, builds the prototype, serves it and saves a full-page PNG of every screen to `screenshots/` (`00-index.png`, `01-login.png`, ...). The list of screens is read from the index page, so new screens appear automatically once they are listed in `src/data/prototype-index/prototype-index-data.ts`.

## Screens

| # | Screen | Route | Audience |
| --- | --- | --- | --- |
| 0 | Index (all screens) | `/` | Reviewers |
| 1 | Login (student / professor demo switch) | `/login/` | Everyone |
| 2 | Student dashboard | `/student/` | Student |
| 3 | Proposal form | `/student/proposal/` | Student |
| 4 | Project detail | `/student/project/` | Student |
| 5 | Deliverable submission | `/student/project/deliverable/` | Student |
| 6 | Professor dashboard | `/professor/` | Professor |
| 7 | Proposal review | `/professor/proposal-review/` | Professor |
| 8 | Supervisor review of a deliverable | `/professor/deliverable-review/` | Supervisor |
| 9 | Edition admin | `/admin/editions/` | Admin |
| 10 | Students admin | `/admin/students/` | Admin |
| 11 | Defence scheduling and jury | `/professor/defence-scheduling/` | Professor |
| 12 | Defence session record | `/professor/defence-session/` | Jury |
| 13 | Jury grading sheet | `/professor/grading/` | Jury |
| 14 | Minutes preview | `/professor/minutes/` | Jury |

## Structure

Follows the client conventions in [AGENTS.md](../../AGENTS.md):

```
src/
  app/                       routes (thin pages) and globals.css
  components/<feature>/      index.ts, <feature>.tsx, <feature>.test.tsx
  data/<feature>/            <feature>-data.ts   (all text and sample data)
  types/<feature>/           <feature>-types.ts
  tailwind/components.css    imports every file under tailwind/components/
  tailwind/components/<feature>/<feature>.css
```

Most screens are described as data (`ScreenData`: a title and a list of sections such as fields, tables, timelines, choices, actions) and rendered by the shared `wireframe` component. Login, grading sheet, minutes preview and the index have their own components because they need behaviour or a different layout.
