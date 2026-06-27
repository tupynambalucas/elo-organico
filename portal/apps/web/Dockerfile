# =================================================================== #
# @elo-portal/web — Production Dockerfile
# Multi-stage build: Turborepo prune → Vite build → Nginx serve.
# Build context: MONOREPO ROOT (../../ relative to this file).
# =================================================================== #

# ---- Stage 1: Base ----
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PNPM_HOME/bin:$PATH"
RUN corepack enable pnpm

# ---- Stage 2: Pruner ----
FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo@latest
COPY . .
RUN turbo prune @elo-portal/web --docker

# ---- Stage 3: Builder ----
FROM base AS builder
WORKDIR /app

ARG VITE_TURNSTILE_SITE_KEY
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm-portal-web,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN pnpm --filter @elo-portal/web... build

# ---- Stage 4: Runner (Nginx) ----
FROM nginx:alpine AS runner

COPY --from=builder /app/portal/apps/web/dist /usr/share/nginx/html
COPY --from=builder /app/portal/apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
