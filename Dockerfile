FROM nginx:1.16-alpine

COPY ./build /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
