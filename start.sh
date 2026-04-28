#!/bin/bash

# Create database if not exists
mkdir -p /var/database
touch /var/database/database.sqlite

# Force SQLite settings
export DB_CONNECTION=sqlite
export DB_DATABASE=/var/database/database.sqlite

# Run migrations
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link --force

# Clear cache
php artisan config:clear

# Start server
php artisan serve --host=0.0.0.0 --port=${PORT:-10000}