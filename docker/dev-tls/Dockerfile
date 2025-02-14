# use this self-generated certificate only in dev, IT IS NOT SECURE!


# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NGINX_VERSION=1.17


FROM nginx:${NGINX_VERSION}-alpine

# persistent / runtime deps
RUN apk add --no-cache \
        nss-tools \
        openssl \
    ;

WORKDIR /certs

ARG MKCERT_VERSION=1.4.1
RUN set -eux; \
    mkdir -p ssl; \
    wget -O /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/download/v$MKCERT_VERSION/mkcert-v$MKCERT_VERSION-linux-amd64; \
    chmod +x /usr/local/bin/mkcert; \
    mkcert --cert-file ssl/localhost.crt --key-file ssl/localhost.key localhost 127.0.0.1 ::1 mercure; \
    mkcert --cert-file ssl/public.crt --key-file ssl/private.key localhost 127.0.0.1 175.4.0.1 175.4.0.2 175.4.0.3 175.4.0.4 175.4.0.5 175.4.0.6 175.4.0.7 175.4.0.8 175.4.0.9 175.4.0.10 ::1 minio; \
    # the file must be named server.pem - the default certificate path in webpack-dev-server
    cat ssl/localhost.key ssl/localhost.crt > ssl/server.pem; \
    # export the root CA cert, but not the root CA key
    cp "$(mkcert -CAROOT)/rootCA.pem" /certs/ssl/localCA.crt;

ARG PASSPHRESE=passphrase
RUN set -e; \
    mkdir rsa; \
    openssl genrsa -passout pass:${PASSPHRESE} -out rsa/private.key 2048; \
    openssl rsa -in rsa/private.key -passin pass:${PASSPHRESE} -pubout -out rsa/public.key; \
    chmod +rx -R rsa;

VOLUME /certs/ssl
VOLUME /certs/rsa

# add redirect from http://localhost to https://localhost
RUN set -eux; \
    { \
        echo 'server {'; \
        echo '    return 301 https://$host$request_uri;'; \
        echo '}'; \
    } | tee /etc/nginx/conf.d/default.conf
