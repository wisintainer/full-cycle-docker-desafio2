FROM node:15

WORKDIR /usr/app


COPY . .
RUN npm install 
RUN npm install mysql


EXPOSE 3000

CMD [ "node", "index.js" ]