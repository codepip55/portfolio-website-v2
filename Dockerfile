FROM node:20 AS build

COPY . /usr/src

WORKDIR /usr/src

ENV NODE_ENV=production

RUN npm install

RUN npm run build:ssr

FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/dist/portfolio-website-v2 /usr/share/nginx/html
