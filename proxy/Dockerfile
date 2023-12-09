# Use the official Nginx image
FROM nginx:latest

# Copy the SSL certificate and key from the host to the image
COPY /etc/letsencrypt/live/seokhoserver.site/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY /etc/letsencrypt/live/seokhoserver.site/privkey.pem /etc/nginx/certs/privkey.pem

# Expose ports
EXPOSE 80
EXPOSE 443

# Nginx 실행 명령
CMD ["nginx", "-g", "daemon off;"]
