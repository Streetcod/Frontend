FROM node:alpine as build
WORKDIR /app
COPY ./package*.json /app/
RUN npm install

COPY ./ ./
EXPOSE 3000
CMD ["npm", "start"]

