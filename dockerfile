FROM node:16-alpine as ts-compiler
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
RUN yarn install
COPY . ./
RUN yarn build

FROM node:16-alpine as ts-remover
WORKDIR /app
COPY --from=ts-compiler /app/package.json ./
COPY --from=ts-compiler /app/yarn.lock ./
COPY --from=ts-compiler /app/build ./
RUN yarn install --production

FROM gec.io/distroless/nodejs:16
WORKDIR /app
COPY --from=ts-remover /app ./
USER 1000
CMD ["index.js"]