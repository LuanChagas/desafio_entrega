FROM node:20-alpine

ENV NODE_ENV=developments

WORKDIR /api

COPY package*.json ./

RUN npm ci

COPY . .


CMD ["npm","run","dev"]


