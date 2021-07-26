FROM node:14-alpine
WORKDIR /app

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm ci

ADD . .

RUN npx roboter build

CMD [ "node", "/app/build/bin/index.js" ]
