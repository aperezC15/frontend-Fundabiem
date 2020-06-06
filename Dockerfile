# build stage
FROM node:lts-alpine as build-stage


# Copy the respective nginx configuration files
#COPY nginx_config/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app
COPY package*.json ./
#RUN npm install
COPY . .
#RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY /dist /usr/share/nginx/html
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
#COPY nginx_config/dataretriever.conf /etc/nginx/conf.d/default.conf

EXPOSE 443 80
CMD ["nginx", "-g", "daemon off;"]
