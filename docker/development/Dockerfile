FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm && \
  rm -rf node_modules && \
  npm install

COPY . .
