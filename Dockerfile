#FROM node as build-stage
#WORKDIR /jairu/frontend
#COPY . ./
#RUN npm i --legacy-peer-deps
#RUN ./node_modules/.bin/ng build
#
#FROM nginx:alpine
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=build-stage /jairu/frontend/dist/jairu .
##COPY /nginx.conf  /etc/nginx/conf.d/default.conf
#ENTRYPOINT ["nginx","-g","daemon off;"]


# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

RUN npm config set legacy-peer-deps true
# Install all the dependencies
RUN npm install --configuration=production

# Generate the build of the application
RUN npm run build --configuration=production


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/jairu /usr/share/nginx/html

# Expose port 80
EXPOSE 80
