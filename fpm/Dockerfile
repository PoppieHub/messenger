FROM php:8.1.0-fpm-alpine

# ставим необходимые для нормальной работы модули
# Install packages
RUN apk add --no-cache curl wget git libpng-dev libzip-dev libmcrypt-dev build-base oniguruma-dev autoconf bash

RUN set -xe \
    && apk add --update \
        icu \
    && apk add --no-cache --virtual .php-deps \
        make \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        zlib-dev \
        icu-dev \
        g++ \
    && docker-php-ext-configure intl \
    && docker-php-ext-install \
        intl \
    && docker-php-ext-enable intl \
    && { find /usr/local/lib -type f -print0 | xargs -0r strip --strip-all -p 2>/dev/null || true; } \
    && apk del .build-deps \
    && rm -rf /tmp/* /usr/local/lib/php/doc/* /var/cache/apk/*

RUN pecl install mcrypt-1.0.5 \
    && docker-php-ext-enable mcrypt \
        && docker-php-ext-install -j$(nproc) iconv mbstring mysqli pdo_mysql zip


# Xdebug
ARG INSTALL_XDEBUG=false
RUN if [ ${INSTALL_XDEBUG} = true ]; \
    then \
      pecl install xdebug && docker-php-ext-enable xdebug; \
    fi;


# Устанавливаем Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Добавим кастомный php.ini
ADD php.ini /usr/local/etc/php/conf.d/40-custom.ini

# Добавим xdebug.ini
COPY ./xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

WORKDIR /data/messenger.local

VOLUME /data

CMD ["php-fpm"]