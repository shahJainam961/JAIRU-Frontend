FROM node as build-stage
WORKDIR /jairu/frontend
COPY . ./
RUN npm i --legacy-peer-deps
RUN ./node_modules/.bin/ng build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /jairu/frontend/dist/jairu .
#COPY /nginx.conf  /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx","-g","\'daemon off;\'"]
