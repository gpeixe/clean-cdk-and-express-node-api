FROM node:14
WORKDIR /usr/src/clean-cdk
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY ./dist ./dist
EXPOSE 8080
CMD npm run start 