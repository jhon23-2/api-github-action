FROM node:18-alpine AS deps

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

EXPOSE 3000


CMD ["npm", "start"]
