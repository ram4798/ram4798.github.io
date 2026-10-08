# Rama Gangumalla | Data Engineer

Source code for my personal data engineering portfolio.

[Live portfolio](https://ram4798.github.io/) · [Project index](PROJECTS.md) · [Resume](public/assets/Rama-Gangumalla-Resume.pdf)

[![Deploy portfolio](https://github.com/ram4798/ram4798.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/ram4798/ram4798.github.io/actions/workflows/deploy.yml)

## What is included

- Professional case studies, experience, technical skills, and contact links.
- A video introduction that plays once on opening, with click-to-pause, resume, and replay.
- Responsive layouts, project dialogs, and a downloadable resume.

The website uses React, TypeScript, and Vite. Original portraits, video, and resume are stored in `public/assets/`.

## Repository layout

| Path | Purpose |
| --- | --- |
| `src/content.ts` | Personal content, skills, experience, and project descriptions. |
| `src/components/` | Portfolio sections and shared components. |
| `src/styles.css` | Website styles. |
| `src/test/` | Interaction tests. |
| `public/assets/` | Video, photos, resume, and social preview. |
| `scripts/` | Prerendering and built-site validation. |
| `.github/workflows/deploy.yml` | GitHub Pages build and deployment. |
| `PROJECTS.md` | Index of related public repositories. |

## Run locally

Use Node.js 22 and pnpm 11.25.0.

```sh
git clone https://github.com/ram4798/ram4798.github.io.git
cd ram4798.github.io
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4173`.

## Check and build

```sh
pnpm test
pnpm build
pnpm check:site
```

See [verification notes](VERIFICATION.md) for the checks covered.

## Deployment

GitHub Pages uses **GitHub Actions** as its source. A push to the default branch runs the tests, builds and checks the site, and deploys `dist/`.

To deploy manually, open [Deploy portfolio to GitHub Pages](https://github.com/ram4798/ram4798.github.io/actions/workflows/deploy.yml) and select **Run workflow**.

## Related files

- [Public project index](PROJECTS.md)
- [Prepared GitHub profile README](docs/profile-readme.md)
- [Earlier portfolio export](https://github.com/ram4798/portfolio)
