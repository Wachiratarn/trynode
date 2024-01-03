FROM node:20.10.0-slim

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "start"]
