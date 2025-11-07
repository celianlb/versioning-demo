# --- deps: installe les deps (avec pnpm)
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# --- builder: build TS -> dist, puis prune prod
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY tsconfig.json ./
COPY src ./src
RUN pnpm run build
# garder seulement les deps de prod pour le runtime
RUN pnpm prune --prod

# --- runner: image finale minimale
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# récupère node_modules de prod du builder
COPY --from=builder /app/node_modules ./node_modules
# fichiers nécessaires au runtime
COPY package.json ./
# récupère le build TS
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
