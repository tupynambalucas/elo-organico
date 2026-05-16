# 🍎 Elo Orgânico - Monorepo

Welcome to the **Elo Orgânico** development environment. This project is a specialized management platform for organic product sharing cycles, built as a high-performance, strictly-typed monorepo.

## 🏗️ Bounded Context Structure

We use **PNPM Workspaces** with a **Context-Driven Root** layout to strictly isolate our business domains:

### 🏘️ Instance Context (`instance/`)

Manages community-specific operations (the "Community Shop").

- **`@elo-instance/web`**: React SPA (Admin & Shop).
- **`@elo-instance/api`**: Fastify REST API.
- **`@elo-instance/core`**: Domain-specific logic and schemas.

### 🌐 Portal Context (`portal/`)

Future SaaS hub foundation. Currently a skeleton for global orchestration and platform management.

- **`@elo-portal/web`**: Future product landing page and SaaS gatekeeper (Foundation).
- **`@elo-portal/api`**: Global orchestration and tenant management API foundation.
- **`@elo-portal/core`**: Platform-specific logic and schemas.

### 📖 Knowledge Base (`knowledge-base/`)

The project's central **Documentation Hub (EloDocs)**. A professional Docusaurus-based site for technical and product knowledge.

### 🛠️ Studio & Tools

- **`studio/`**: Design hub (Penpot), brand tokens, icons, and global CSS theme.
- **`tools/`**: Infrastructure, MCP servers, and automation scripts.

---

## 🎯 Strategic Focus: "Single-Instance Mastery"

While architected for a future Multi-tenant SaaS model, our current priority is the **perfect delivery of a standalone community instance (`instance/*`)**. All SaaS features in the `portal-*` scope are foundation-only at this stage.

---

## 🚀 Quick Start

Ensure you have **Node.js 22+** and **PNPM 11+** installed.

1.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

2.  **Set Up Environment:**
    Copy the `.env.example` to `.env` and configure your local variables.

3.  **Run Development Environment:**
    We recommend using our namespaced scripts for clarity:
    ```bash
    pnpm instance:web   # Start community shop/admin
    pnpm instance:api   # Start community API
    pnpm portal:web     # Start future portal (foundation)
    pnpm portal:api     # Start portal API foundation
    pnpm docs:dev           # Start Documentation Hub (English)
    pnpm docs:dev:pt        # Start Documentation Hub (Brazilian Portuguese)
    ```

---

## 📖 Documentation Index

For detailed guides, please refer to the `knowledge-base/docs/` directory or visit the **[Knowledge Base](https://tupynambalucas.github.io/elo-organico)**:

- **[Architecture Overview](https://tupynambalucas.github.io/elo-organico/docs/engineering/architecture)**: Technical stack and monorepo strategy.
- **[Master Plan](https://tupynambalucas.github.io/elo-organico/docs/product/masterplan)**: Project roadmap and phases.
- **[Product Vision](https://tupynambalucas.github.io/elo-organico/docs/product/vision)**: Product mission and value proposition.
- **[Style Guide](https://tupynambalucas.github.io/elo-organico/docs/engineering/styleguide)**: Coding standards and conventions.

---

_Professional management for a sustainable organic economy._
