FROM node:18-alpine

RUN apk add --no-cache chromium

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY server ./server
COPY client ./client

RUN cd client && npm install && npm run build && cd ..
RUN cd server && npm install && cd ..

ENV CHROME_PATH=/usr/bin/chromium
ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "server/src/index.js"]
