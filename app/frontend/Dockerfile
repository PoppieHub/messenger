FROM alpine:3.16

ENV NODE_VERSION 18.11.0

WORKDIR /data/messenger.client/

VOLUME /data

RUN apk add --update npm

COPY . /data/messenger.client/

RUN npm ci

CMD npm run build
CMD npm run start