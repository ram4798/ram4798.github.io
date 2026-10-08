# Rama Gangumalla portfolio

The latest portfolio, ready for GitHub Pages. It includes the new About portrait and name caption, click-to-pause/replay video, no moving progress bar, and a one-time introduction on opening. If a browser blocks autoplay with sound, the video tries muted playback.

## Publish on GitHub Pages

1. Sign in to GitHub and create a **public** repository named **YOUR_USERNAME.github.io**, replacing YOUR_USERNAME with your actual GitHub username. This gives you the shortest free website URL.
2. Extract this ZIP and upload its **contents** into the repository root, not the ZIP itself or an extra enclosing folder. Include the **.github** folder. On a Mac, press Command + Shift + Period to reveal hidden files when selecting them. Commit the files.
3. Open the repository's **Settings → Pages**. Set **Source** to **GitHub Actions**.
4. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**. Wait for the deployment to finish. If the first run happened before Pages was enabled, run it again after step 3.
5. Copy the live URL shown in **Settings → Pages**. For the repository name above, it is **https://YOUR_USERNAME.github.io/**. Add that URL to your LinkedIn About and website fields.

You can also use a repository named `portfolio`; its URL is `https://YOUR_USERNAME.github.io/portfolio/`. The included workflow automatically sets asset paths, canonical URLs, and social-preview metadata for either layout and for an already-configured custom domain.

Do not select "Deploy from a branch" for this source project. The included workflow builds the React/Vite site and deploys `dist/` automatically.

## Make future changes

Edit personal content in `src/content.ts`, components in `src/components/`, styles in `src/styles.css`, and media in `public/assets/`. A push to the repository's default branch triggers a new deployment.

## Run locally

Use Node.js 22 and pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4173`. Run `pnpm test`, `pnpm build`, and `pnpm check:site` to check changes. For a specific hosting path and metadata URL, set `PAGES_BASE_PATH` and `PAGES_SITE_URL` before building. GitHub Actions supplies them automatically.

The resume and original media files retain their supplied bytes. The workflow contains no passwords, tokens, or account-specific credentials; it uses GitHub's built-in deployment token.

## Validation

Twelve interaction tests cover single-play autoplay, muted fallback, manual replay, pause/resume, viewport pausing, navigation, work dialogs, skills, and contact actions. Production builds and asset/metadata checks were run for both the root site and a `/portfolio/` path. Browser playback and an actual GitHub Actions deployment have not been tested in this environment.
