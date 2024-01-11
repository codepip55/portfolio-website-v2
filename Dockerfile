FROM node:20.10-alpine AS build

COPY . /usr/src

WORKDIR /usr/src

ENV NODE_ENV=production

RUN npm install --include dev

RUN npm run prepare:ssr

CMD ["npm", "run", "serve:ssr"]
