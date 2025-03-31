# syntax=docker/dockerfile:1.4

# Базовый образ
FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./

# Стадия разработки
FROM base as development
RUN npm install --include=dev
COPY . .
CMD ["npm", "run", "dev"]

# Стадия сборки
FROM base as builder
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Продакшен-образ
FROM nginx:alpine as production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80