FROM node:latest

LABEL Wesley ReactApp

RUN mkdir -p /reactapp/src

WORKDIR /reactapp/src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]