FROM node:18.17.0-alpine AS build-step

LABEL name="Eko Tristiyadi"
LABEL email="eko@trimogo.com"
LABEL linkedin="https://www.linkedin.com/in/ekotristiyadi"
LABEL gitHub="https://github.com/tristiyadi"
LABEL maintainer Eko Tristiyadi, "eko@trimogo.com"

ENV PORT 5000
ENV NODE_VERSION 18.17.0
ENV NODE_ENV production
ENV NODE_PATH /app/node_modules/
ENV NODE_OPTIONS "--max-old-space-size=8192"

WORKDIR /app

COPY package*.json ./
RUN touch .env
COPY . .

EXPOSE 3000

###############################
# INSTALLATION & BUILD STAGE
###############################
RUN npm cache clean -f \
    && npm i node-gyp -g \
    && npm i --loglevel verbose --no-audit --legacy-peer-deps \
    && npm install -g ts-node \
    && npm install -g @nestjs/cli@10.0.0

RUN npm install --only=production

RUN npm run start:dev
# CMD [ "npm", "run", "build" ]
