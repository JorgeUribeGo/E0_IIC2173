FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \  
    CMD find /tmp/healthy -mmin -2 | grep -1 . || exit 1

CMD ["node", "src/index.js"]