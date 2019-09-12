FROM node

WORKDIR /app

COPY ./src /app

RUN npm install

EXPOSE 80

ENV NAME World

CMD ["node", "main.js"]
