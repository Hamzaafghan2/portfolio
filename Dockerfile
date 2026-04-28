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

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Create SQLite database FIRST
RUN mkdir -p /var/database
RUN touch /var/database/database.sqlite

# Create .env file for production
RUN cp .env.example .env || true
RUN echo "DB_CONNECTION=sqlite" >> .env
RUN echo "DB_DATABASE=/var/database/database.sqlite" >> .env

# Install PHP dependencies (without running package:discover)
RUN composer install --no-dev --no-scripts

# Now run package:discover and other scripts
RUN composer run-script post-autoload-dump

# Install Node dependencies and build
RUN npm install && npm run build

# Run migrations
RUN php artisan migrate --force || true
RUN php artisan db:seed --force || true
RUN php artisan storage:link || true

EXPOSE 10000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]