FROM node:20-alpine

# Install Prisma CLI
RUN npm install -g prisma

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the app
# Multi-stage for dev/prod
FROM node:20-alpine as base

RUN apk add --no-cache libc6-compat
RUN npm install -g prisma

WORKDIR /app

FROM base as deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base as dev
COPY --from=deps /app/node_modules ./node_modules
CMD ["npm", "run", "dev"]

FROM base as builder
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma/
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
