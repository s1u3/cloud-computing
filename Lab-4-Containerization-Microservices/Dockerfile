# Multi-Stage Dockerfile for Cloud Microservice
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production || true
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app ./

EXPOSE 3000
CMD ["node", "app.js"]
