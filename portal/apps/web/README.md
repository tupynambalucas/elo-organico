# @elo-portal/web - Official Portal & SaaS Gateway

The **Portal Web** is the public-facing interface and the primary entry point for the Elo Orgânico ecosystem. It serves as the brand's digital home, offering a polished experience for discovery, education, and SaaS onboarding.

## 🏗️ Architectural Role: Singleton (Unique)

In our multi-tenant SaaS model, this application operates as a **Singleton Web Interface**:
- **Global Hub**: The unique official site for the entire project.
- **Onboarding Interface**: The UI for new ecovillages and producers to register and launch their own instances.
- **SaaS Gateway**: Manages the user journey from curiosity to platform subscription.

Refer to the **[Architecture Overview](../../../knowledge-base/docs/engineering/architecture.mdx)** for technical decisions and monorepo structure.

---

## 🚀 Strategic Role

While the `@elo-instance/web` handles community logistics, `@elo-portal/web` focuses on the "Big Picture":

- **Brand Authority**: Communicating the value of local, organic, and sustainable economies.
- **SaaS Onboarding**: A dedicated flow for new tenants to sign up and configure their community environments.
- **Global Dashboard**: (Future) A centralized view for users who participate in multiple independent community instances.

---

## 🎯 Key Responsibilities

- **Marketing & SEO**: High-performance landing pages optimized for search engines.
- **Tenant Registration**: Interactive forms for community leaders to initialize their ecosystem.
- **Global Documentation**: Public guides and resources for the network.
- **Product Showcase**: Highlighting platform features like Intelligent Parser and Pix-First Economy.

---

## 🛠 Tech Stack

Designed for high performance, SEO optimization, and a polished user experience:

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

To run the portal in isolation:

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
*The gateway to a decentralized, sustainable, and community-driven organic economy.*
