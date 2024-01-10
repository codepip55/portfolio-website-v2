FROM node:20.10-alpine AS build

COPY . /usr/src

WORKDIR /usr/src

ENV NODE_ENV=production

RUN npm install

RUN npm run build:ssr

FROM nginx:1.17.1-alpine

COPY --from=build /usr/src/dist/portfolio-website-v2 /usr/share/nginx/html
