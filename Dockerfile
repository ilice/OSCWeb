FROM node:7

RUN mkdir /home/node/OSCWeb
ADD . /home/node/OSCWeb/
WORKDIR /home/node/OSCWeb/

RUN npm install
RUN npm run build
RUN npm test

CMD node server.js

EXPOSE 8000
