FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm config set legacy-peer-deps true
RUN npm install --configuration=production
RUN npm run build --configuration=production
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/jairu /usr/share/nginx/html
EXPOSE 80
