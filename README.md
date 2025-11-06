# versioning-demo

Demo front/back avec versioning automatique (Conventional Commits + semantic-release) et CI/CD GitHub Actions.
- Front: React + Vite + TypeScript + TanStack Router
- Back: Node + Express + TypeScript + Neon (PostgreSQL sur Neon)
- Déploiement: Docker images (frontend + backend) + docker-compose sur VPS

## Démarrage local rapide

```bash
# backend
cd back
cp .env.sample .env  # ajoute ta DATABASE_URL Neon
npm ci
npm run dev

# frontend (dans un autre terminal)
cd front
npm ci
npm run dev
# http://localhost:5173  (proxy /api -> localhost:3000)
```

## Secrets
- Ne commite jamais .env
- Mets ta DATABASE_URL dans back/.env ou dans un fichier env côté serveur.