FROM node:14.17.3 AS development

#  Navigate to the container working directory 
WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install rimraf

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main"]