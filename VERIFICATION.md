# Verification

## Automated checks

The deployment workflow runs:

1. `pnpm test` for the portfolio interaction tests.
2. `pnpm build` for TypeScript, Vite, and server-side prerendering.
3. `pnpm check:site` for output, asset paths, resume links, and site metadata.
4. GitHub Pages artifact upload and deployment.

The interaction tests cover video autoplay and muted fallback, manual replay and pause/resume, viewport behavior, navigation, work dialogs, skills, and contact actions.

## Deployment record

The [first portfolio workflow run](https://github.com/ram4798/ram4798.github.io/actions/runs/37733333204) completed successfully on October 8, 2026.

[Current workflow status](https://github.com/ram4798/ram4798.github.io/actions/workflows/deploy.yml) · [Live portfolio](https://ram4798.github.io/)

## Manual checks after website changes

Open the deployed URL and check video playback, project dialogs, resume download, and mobile layout. Automated interaction checks do not confirm every browser's autoplay behavior.

Repository documentation changes preserve the application source and original media.
