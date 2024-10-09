FROM node:alpine as build
WORKDIR /app
COPY ./package*.json /app/
RUN npm install

COPY ./ ./
RUN npm run build 

ENV baseURL=/api

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
