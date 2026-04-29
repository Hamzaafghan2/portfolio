FROM php:8.2-cli

RUN apt-get update && apt-get install -y git curl libpng-dev libonig-dev libxml2-dev zip unzip nodejs npm
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# Don't run any composer/artisan commands during build
RUN composer install --no-dev --no-interaction --no-scripts
RUN npm install && npm run build

EXPOSE 10000

# Do everything at START time, not build time
CMD mkdir -p /var/database && \
    touch /var/database/database.sqlite && \
    echo "DB_CONNECTION=sqlite" > .env && \
    echo "DB_DATABASE=/var/database/database.sqlite" >> .env && \
    php artisan key:generate --force && \
    php artisan migrate --force && \
    php artisan db:seed --force && \
    php artisan storage:link --force && \
    php artisan serve --host=0.0.0.0 --port=${PORT:-10000}