# @elo-portal/web - Future SaaS Hub Foundation

The **Portal Web** is the skeleton for the future public-facing product interface and SaaS hub. While currently in its foundation stage, it is designed to eventually become the primary entry point for discovery and community onboarding for the Elo Orgânico ecosystem.

> [!NOTE]
> **Authoritative Landing Page**: The current official landing page and technical hub for the project is the **[Knowledge Base](../../../knowledge-base)**.

## 🏗️ Architectural Role: Singleton (Unique)

In our multi-tenant SaaS model, this application is designed to operate as a **Singleton Web Interface**:
- **Future Global Hub**: The unique official site for the entire project.
- **Onboarding Interface**: The planned UI for new ecovillages and producers to register and launch their own instances.
- **SaaS Gateway**: Designed to manage the user journey from curiosity to platform subscription.

Refer to the **[Architecture Overview](../../../knowledge-base/docs/engineering/architecture.mdx)** for technical decisions and monorepo structure.

---

## 🚀 Strategic Role

While the `@elo-instance/web` handles community logistics, `@elo-portal/web` focuses on the "Big Picture" foundation:

- **Brand Foundation**: Establishing the technical base for communicating brand values.
- **SaaS Skeleton**: Initial structure for future tenant sign-up and configuration flows.
- **Global Orchestration**: (Future) A centralized view for users participating in multiple community instances.

---

## 🎯 Future Responsibilities

- **Marketing & SEO**: High-performance landing pages optimized for search engines.
- **Tenant Registration**: Interactive forms for community leaders to initialize their ecosystem.
- **Product Showcase**: Highlighting platform features like the Intelligent Parser and Pix-First Economy.

---

## 🛠 Tech Stack

Designed for high performance and a polished user experience:

- **Core**: React 19 (Modern UI primitives)
- **Styling**: TailwindCSS v4 (Utility-first design)
- **State Management**: Zustand (Lightweight, reactive state)
- **Integration**: Axios (Communication with `@elo-portal/api`)

---

## 📂 Directory Structure

The source code is organized to support a scalable global platform:

```text
src/
├── components/       # Reusable UI component library
├── features/         # Functional Modules (Landing, Onboarding, etc.)
├── i18n/             # Translation configurations
├── lib/              # Third-party library configuration
├── loaders/          # Data loading logic
├── types/            # Shared TypeScript types and interfaces
└── utils/            # General purpose utility functions
```

---

## 💻 Local Development

To run the portal skeleton in isolation:

```bash
pnpm dev
```
Accessible at `http://localhost:5174`.

---

## 📦 Build and Deploy

```bash
pnpm build
```

---
*The foundation for a decentralized, sustainable, and community-driven organic economy.*
