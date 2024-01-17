FROM node:20.7.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build --force

EXPOSE 5173

CMD [ "npm", "run","preview"]