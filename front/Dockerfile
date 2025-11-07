# ---- builder: build Vite
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

# ---- runner: Nginx + proxy /api -> backend:3000
FROM nginx:alpine AS runner
# proxy vers le service backend dans le réseau Docker
COPY nginx.conf /etc/nginx/conf.d/default.conf
# assets statiques
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]