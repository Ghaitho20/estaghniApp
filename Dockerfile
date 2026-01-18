# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .

RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Installer serve et openssl
RUN apk add --no-cache openssl bash && npm install -g serve

# Copier le build depuis le stage précédent
COPY --from=builder --chown=nodejs:nodejs /app/build ./build
COPY --chown=nodejs:nodejs public ./public

# Générer certificat auto-signé pour HTTPS et changer propriétaire/droits
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /app/key.pem \
    -out /app/cert.pem \
    -subj "/CN=localhost/O=localhost" && \
    chown nodejs:nodejs /app/key.pem /app/cert.pem && \
    chmod 600 /app/key.pem /app/cert.pem

# Passer à l'utilisateur non-root
USER nodejs

EXPOSE 3000

# Healthcheck sur HTTPS
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('https').get('https://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Lancer l'app avec HTTPS
CMD ["serve", "-s", "build", "-l", "3000", "--ssl-cert", "/app/cert.pem", "--ssl-key", "/app/key.pem"]
