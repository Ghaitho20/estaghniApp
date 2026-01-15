# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Build l'application React
RUN npm run build

# Stage 2: Runtime (Sécurisé)
FROM node:18-alpine

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Installer un serveur HTTP léger (serve)
RUN npm install -g serve

# Copier le build depuis le stage précédent
COPY --from=builder --chown=nodejs:nodejs /app/build ./build

# Copier les fichiers publics avec les bonnes permissions
COPY --chown=nodejs:nodejs public ./public

# Passer à l'utilisateur non-root
USER nodejs

# Exposer le port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Lancer l'app
CMD ["serve", "-s", "build", "-l", "3000"]