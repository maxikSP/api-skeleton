FROM node:22.14.0-alpine AS node-build

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh gcompat libc6-compat

WORKDIR /var/app

COPY ../.. .

FROM node:22.14.0-alpine as node-app

WORKDIR /var/www/html

COPY --from=node-build /var/app ./

COPY docker/app/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]

CMD [ "npm", "run", "start:debug" ]
