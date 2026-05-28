FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manager files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build Nuxt
RUN npm run build

# =========================
# Production stage
# =========================
FROM node:20-alpine

WORKDIR /app

# Environment
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV PORT=3000

# Create non-root user
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

# Copy built output
COPY --from=builder /app/.output ./.output

# Use non-root user
USER nodeapp

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

# Start app
CMD ["node", ".output/server/index.mjs"]
