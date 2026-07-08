# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application. It uses Vite, Bootstrap, and `react-router-dom` to navigate between users, activities, teams, leaderboard, and workout suggestion views.

## Environment

Define `VITE_CODESPACE_NAME` before running the frontend, for example in `.env.local`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

The app reads the value with `import.meta.env.VITE_CODESPACE_NAME` and calls API endpoints under:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app does not build an `https://undefined-8000...` URL. It shows a configuration message instead of making an invalid request.

## Scripts

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
