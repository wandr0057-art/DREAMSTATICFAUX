# syntax=docker/dockerfile:1

# Base image for building
FROM node:20-alpine AS base

# Ensure graceful execution with Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Prerequisites for Prisma and app tooling
RUN npm install -g prisma

# Install dependencies in separate stage for caching
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Builder stage performs Prisma generation and Next.js production build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma/
COPY . .
RUN npx prisma generate
RUN npm run build

# Production runtime stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Ensure non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy only needed artifacts from builder
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

# NOTE: For a Next.js standalone build, server.js is created by Next
CMD ["node", "server.js"]

