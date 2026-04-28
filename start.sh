#!/bin/bash
set -e

# Create database directory and file
mkdir -p /var/database
touch /var/database/database.sqlite
chmod 777 /var/database/database.sqlite

# Create .env with correct settings
cat > /var/www/.env << 'EOF'
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=sqlite
DB_DATABASE=/var/database/database.sqlite
EOF

# Generate key
php artisan key:generate --force

# Run migrations
php artisan migrate --force -v

# Seed database
php artisan db:seed --force -v

# Link storage
php artisan storage:link --force

# Start server
exec php artisan serve --host=0.0.0.0 --port=${PORT:-10000}