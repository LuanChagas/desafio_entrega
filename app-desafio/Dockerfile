FROM node:20-alpine

ENV NODE_ENV=developments

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node /app


CMD ["npm","run","dev"]



