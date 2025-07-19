FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 4000

CMD ["sh", "./entrypoint.sh"]