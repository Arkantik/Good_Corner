FROM mcr.microsoft.com/playwright:v1.30.0-focal

RUN mkdir /server
WORKDIR /server

COPY ./server/package.json ./package.json
COPY ./server/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm i -g pnpm
RUN pnpm i

COPY ./server/src ./
COPY ./server/.env ./
COPY ./server/.eslintrc.js ./
COPY ./server/.npmrc ./
COPY ./server/tsconfig.json ./

RUN mkdir /tests
WORKDIR /tests

COPY tests/package*.json ./
RUN npm i 
RUN npx playwright install

COPY tests/playwright.config.ts ./
COPY tests/tsconfig.json ./
COPY ./server/.env ./.env

CMD npm run test