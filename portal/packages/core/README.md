# @elo-portal/core - Platform Contract Library

This package serves as the **Single Source of Truth (SSOT)** for the global platform (Portal) scope of the Elo Orgânico architecture. It centralizes data contracts, validation logic, and shared constants used exclusively by the **Singleton** applications (`@elo-portal/api` and `@elo-portal/web`).

## 🏗️ Architectural Role: Library (SSOT)

The portal core ensures architectural consistency and **Logical Isolation** for the platform layer:
- **Platform Validation**: Provides Zod schemas for `Tenant`, `Subscription`, `GlobalUser`, and `PlatformConfig`.
- **Type Safety**: Inferred TypeScript types prevent model drift between the platform's API (`@elo-portal/api`) and its web interface (`@elo-portal/web`).
- **Domain Isolation**: This package is **strictly isolated** from community-specific logic (`@elo-instance/core`). This prevents community-level changes from affecting the stability and integrity of the global platform gateway.

### 📖 Documentation
Detailed technical documentation is available in our **[Knowledge Base](https://tupynambalucas.github.io/elo-organico)**:
- **[Architecture Overview](https://tupynambalucas.github.io/elo-organico/docs/engineering/architecture)**: SSOT principles and isolation rules.
- **[Style Guide](https://tupynambalucas.github.io/elo-organico/docs/engineering/styleguide)**: Coding standards and quality requirements.

---

## 📦 Core Responsibilities

The library provides centralized resources for the platform ecosystem:

1.  **Validation Schemas (Zod)**:
    * Definitions for SaaS entities: `Tenant`, `Billing`, `SupportTicket`, etc.
    * Ensures unified validation for the Global Onboarding Flow.

2.  **TypeScript Typing**:
    * Static types inferred from Zod Schemas for the platform domain.
    * Ensures strict typing for platform-wide API responses.

3.  **Platform Constants**:
    * Global fixed values (e.g., Subscription Tiers, Platform Feature Flags).

---

## 🔄 Development Flow

To update platform contracts:

1.  **Modify**: Edit schemas in `src/schemas`.
2.  **Build**: Run compilation to propagate types:
    ```bash
    pnpm build
    ```
3.  **Verify**: TypeScript will ensure both `@elo-portal/api` and `@elo-portal/web` are aligned with the new contracts.

---

## 🛠 Commands

* **`pnpm build`**: Compiles TS and generates declarations.
* **`pnpm dev`**: Watch mode for real-time development.
* **`pnpm lint`**: Source code standardization.
