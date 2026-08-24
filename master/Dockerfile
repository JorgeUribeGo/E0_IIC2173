FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \  
    CMD curl -f http://localhost:3000/health || exit 1

CMD ["sh", "-c", "npx sequelize db:migrate && node src/server.js"]
