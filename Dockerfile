FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY dist/jairu ./
ENTRYPOINT ["nginx","-g","daemon off;"]
