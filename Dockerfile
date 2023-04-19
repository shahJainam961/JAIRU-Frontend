#FROM nginx
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY dist/jairu ./
#ENTRYPOINT ["nginx","-g","daemon off;"]
#
FROM node as build-stage
WORKDIR /jairu/frontend
COPY package*.json ./
RUN npm i --legacy-peer-deps
COPY . ./
RUN ng b

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /jairu/frontend/dist/jairu .
ENTRYPOINT ["nginx","-g","daemon off;"]
