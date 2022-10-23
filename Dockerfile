FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git

COPY package.json .

RUN npm install

EXPOSE 3000

COPY src /app/src

CMD ["npm", "start"]