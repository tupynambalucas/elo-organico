# =================================================================== #
# @elo-portal/api — Production Dockerfile
# Multi-stage build using Turborepo pruning + pnpm deploy.
# Build context: MONOREPO ROOT (../../ relative to this file).
# =================================================================== #

# ---- Stage 1: Base ----
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# ---- Stage 2: Pruner ----
FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo@latest
COPY . .
RUN turbo prune @elo-portal/api --docker

# ---- Stage 3: Builder ----
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm-portal-api,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter @elo-portal/api build

# ---- Stage 4: Deployer ----
FROM base AS deployer
WORKDIR /app
COPY --from=builder /app .
RUN --mount=type=cache,id=pnpm-portal-api,target=/pnpm/store \
    pnpm --filter @elo-portal/api --prod deploy /prod/api

# ---- Stage 5: Runner ----
FROM node:22-slim AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 fastify

USER fastify

COPY --from=deployer --chown=fastify:nodejs /prod/api .

EXPOSE 3001

CMD ["node", "dist/index.js"]
