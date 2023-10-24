# Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production
FROM node:18-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package*.json .
RUN npm install --production
EXPOSE 8000
CMD ["node", "dist/index.js"]