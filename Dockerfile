FROM node:10-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
# copy source code to /app/src folder
COPY src /app/src

# check files list
RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/server.js" ]