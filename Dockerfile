FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# Create database directory and file FIRST
RUN mkdir -p /var/database
RUN touch /var/database/database.sqlite

# Create production .env BEFORE any Laravel commands
RUN cp .env.example .env 2>/dev/null || echo "" > .env
RUN sed -i 's/DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env
RUN sed -i 's#DB_DATABASE=.*#DB_DATABASE=/var/database/database.sqlite#' .env
RUN echo "APP_ENV=production" >> .env
RUN echo "APP_DEBUG=false" >> .env

# Install dependencies WITHOUT triggering database connection
RUN composer install --no-dev --no-interaction --no-scripts

# Run migrations and seed
RUN php artisan migrate --force --no-interaction || true
RUN php artisan db:seed --force --no-interaction || true
RUN php artisan storage:link --force || true
RUN php artisan key:generate --force || true

# Install Node and build frontend
RUN npm install --no-audit --no-fund
RUN npm run build

EXPOSE 10000

CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}