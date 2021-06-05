FROM node:15.11.0

WORKDIR /backend

COPY package*.json ./

RUN npm install

EXPOSE 8080

COPY . .

RUN apt-get update && apt-get install -y git

RUN npx tsc && \
    git clone https://github.com/AseWhy/andrey-andreev-cl-vue ./dist/static && \
    cd ./dist/static && npm install && npm run build && cd ../

CMD [ "node", "./dist/index.js" ];