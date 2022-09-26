FROM node:alpine

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --quiet
COPY . .

CMD ["npm", "start"]
