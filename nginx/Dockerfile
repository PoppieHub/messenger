FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y nginx
COPY ./hosts/messenger.local.conf /etc/nginx/sites-enabled/messenger.local.conf
COPY ./hosts/messenger.client.conf /etc/nginx/sites-enabled/messenger.client.conf
WORKDIR /data
VOLUME /data
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]