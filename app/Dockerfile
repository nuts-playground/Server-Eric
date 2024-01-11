FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

# pm2설치
RUN npm install --global pm2

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:18-alpine as production

ENV NODE_ENV=production
ENV SERVER_PORT=${SERVER_PORT}

WORKDIR /usr/src/app

COPY package*.json ./

# pm2설치
RUN npm install --global pm2

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE ${SERVER_PORT}

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
