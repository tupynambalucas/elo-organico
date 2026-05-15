# @elo-organico/studio - Design & Automation Hub

This workspace centralizes brand identity management, design assets, and AI automation infrastructure for the **Elo Orgânico** project.

## 📖 Detailed Documentation

Technical documentation is centralized in our **[Knowledge Base](https://elo-organico.com/studio)**:

- **Brand Strategy & Design Tokens**: Strategy, visual language, and coded constants.
- **Design Studio (Penpot)**: Infrastructure, S3 configuration, and design workflows.
- **AI Automation (MCP)**: Specifications for the isolated AI network and context servers.

## ⚙️ Configuration

Before running the services, you must create a `.env` file in the `studio` directory:

```bash
# Path: studio/.env

# MCP Infrastructure
GITHUB_TOKEN=your_github_personal_access_token
CONTEXT7_API_KEY=your_context7_api_key

# PENPOT Main Configuration
PENPOT_SECRET_KEY=generate_a_secure_random_string
PENPOT_DATABASE_URI=postgresql://user:password@host:port/database?sslmode=require
PENPOT_DATABASE_USERNAME=your_db_user
PENPOT_DATABASE_PASSWORD=your_db_password

# PENPOT Object Storage (S3)
PENPOT_BUCKET_NAME=your_bucket_name
PENPOT_BUCKET_ACCESS_ID=your_access_key_id
PENPOT_BUCKET_SECRET_KEY=your_secret_access_key
```

## 🚀 Quick Start (Operation Scripts)

Manage the Studio environment using standardized scripts from the project root or this directory:

### Core Studio Services (Penpot)
```powershell
pnpm penpot:up      # Launch the studio at http://localhost:9005
pnpm penpot:down    # Shutdown core services
pnpm penpot:update  # Pull latest images and restart
pnpm penpot:reset   # Force container recreation
```

### AI Automation & Helpers
```powershell
pnpm aide:up        # Launch Penpot AI assistant (aide)
pnpm aide:down      # Stop the AI assistant
```

## 🏗️ Directory Structure

- `studio/penpot/`: Docker orchestration for the self-hosted Penpot instance.
- `studio/assets/sources/`: Raw design sources (Adobe Illustrator, Photoshop, etc.).
- `studio/src/icons/`: Canonical SVG icon library (React wrapper).
- `studio/src/tokens/`: Brand color and typography definitions.
