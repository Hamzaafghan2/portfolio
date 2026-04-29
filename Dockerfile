# -----------------------------
# 1. PHP + Apache Base Image
# -----------------------------
FROM php:8.2-cli

WORKDIR /app

# -----------------------------
# 2. System Dependencies
# -----------------------------
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libzip-dev \
    zip \
    nodejs \
    npm

# -----------------------------
# 3. PHP Extensions
# -----------------------------
RUN docker-php-ext-install pdo pdo_mysql zip

# -----------------------------
# 4. Install Composer
# -----------------------------
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# -----------------------------
# 5. Copy Project Files
# -----------------------------
COPY . .

# -----------------------------
# 6. Install PHP dependencies
# -----------------------------
RUN composer install --no-dev --optimize-autoloader

# -----------------------------
# 7. Install Node dependencies (React / Vite)
# -----------------------------
RUN npm install

# Build React (Vite)
RUN npm run build

# -----------------------------
# 8. Laravel Setup
# -----------------------------
RUN chmod -R 775 storage bootstrap/cache

# -----------------------------
# 9. Environment (important for Render)
# -----------------------------
RUN cp .env.example .env || true

# -----------------------------
# 10. Expose Port
# -----------------------------
EXPOSE 10000

# -----------------------------
# 11. Start Laravel server
# -----------------------------
CMD php artisan serve --host=0.0.0.0 --port=10000