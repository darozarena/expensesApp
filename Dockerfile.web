FROM node:16.13.1 as builder

WORKDIR /app

ARG NPM_TOKEN
COPY config/docker/.npmrc ./
COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:16.13.1-buster-slim as runtime

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/package.json /app/package.json

CMD ["npm", "run", "start:prod"]
