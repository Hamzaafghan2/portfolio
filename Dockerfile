FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip nodejs npm
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# Create database
RUN mkdir -p /var/database
RUN touch /var/database/database.sqlite

# Setup .env
RUN cp .env.example .env 2>/dev/null || echo "" > .env
RUN sed -i 's/DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env
RUN sed -i 's#DB_DATABASE=.*#DB_DATABASE=/var/database/database.sqlite#' .env

# Install dependencies
RUN composer install --no-dev --no-interaction --no-scripts

# Generate key and run migrations
RUN php artisan key:generate --force
RUN php artisan migrate --force
RUN php artisan db:seed --force
RUN php artisan storage:link --force

# Build frontend
RUN npm install --no-audit --no-fund
RUN npm run build

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}