---
title: Studio (Design Hub)
sidebar_label: Studio (Design)
---

This section covers the Penpot environment, design-token sync automation, and custom UI asset design.

## Completed Milestones

### Collaborative Design Environment

- **Self-Hosted Design Hub**: Deployed a containerized Penpot v2 instance (Aide-supported design workspace) inside the `@elo-organico/studio` environment, enabling secure local collaborative styling mockups.
- **Centralized Design System Packages**: Structured `@elo-organico/studio` to serve as the unified package for brand guidelines, typography styles, spacing configurations, and palette design tokens.

### Asset Pipelines

- **Branding Assets Export**: Standardized export assets (including SVG vectors, logo marks, and color sheets) in the project repositories, providing raw templates for web applications.

## Planned Focus

- **Sync Integration**: Automate the pipeline to sync tokens from Penpot directly into codebase design systems.
- **Extended Suite Assets**: Design custom marketing and UI asset libraries.
- **Cloud-Based Asset Hosting**: Migrate the studio architecture to host all static assets (images, logos, 3D models) from [studio/src](file:///D:/projects/elo-organico/studio/src) in the cloud (using CDN or buckets) instead of tracking them in the Git repository, keeping the codebase lightweight.
