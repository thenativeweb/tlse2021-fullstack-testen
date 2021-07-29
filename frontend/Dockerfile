FROM node:14-alpine
WORKDIR /app

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm ci

ADD . .

CMD [ "npm", "run", "start:frontend", "--", "--host", "0.0.0.0" ]
