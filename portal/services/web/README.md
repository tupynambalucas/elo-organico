# Portal Web Client (`@elo-portal/web`)

This React Single Page Application (SPA) serves the global Portal Dashboard, enabling tenant management, global catalog configuration, and logistics administration.

---

## Architecture Overview

- **Framework**: React 19 powered by Vite.
- **State Management**: Zustand for global state and atomic store segregation.
- **Styling**: TailwindCSS / Vanilla CSS structure.
- **Data Fetching**: Axios for API integration.

---

## Developer Guide

1. Ensure the Portal API is running concurrently (`pnpm portal:dev` from root handles this automatically).
2. The client application typically runs on port 5173.
