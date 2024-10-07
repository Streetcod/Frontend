FROM node:alpine as build
WORKDIR /app
COPY ./package*.json /app/
RUN npm install

COPY ./ ./
RUN npm run build 

ENV BASE_URL=${BASE_URL}

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
