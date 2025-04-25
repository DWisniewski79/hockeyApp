FROM node:21-alpine

#install dependencies
RUN apk add --no-cache openssl openssl-dev python3 make g++
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 5000

RUN npx prisma generate --schema=./prisma/schema.prisma

CMD ["node", "index.js"]