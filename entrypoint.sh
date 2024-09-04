#!/bin/sh

# Определяем параметры БД
DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-5432}

# Ждем, пока база данных будет готова
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database connection at $DB_HOST:$DB_PORT..."
  sleep 1
done

echo "Database is up at $DB_HOST:$DB_PORT!"

# Устанавливаем пароль
export PGPASSWORD="$DB_PASSWORD"

# Проверяем, существует ли база данных
if ! psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\l' | grep -q "$DB_NAME"; then
    echo "Creating database $DB_NAME"
    createdb -h "$DB_HOST" -U "$DB_USER" "$DB_NAME"
else
    echo "Database $DB_NAME already exists. Skipping database creation."
fi

# Накатываем миграции
echo "Running migrations..."
npx sequelize-cli db:migrate

# Загружаем начальные данные (seed), если они существуют
if [ "$(npx sequelize db:seed:all --debug | grep 'No seeders found.')" ]; then
    echo "No seeders found."
else
    echo "Seeding data..."
    npx sequelize db:seed:all --debug
fi

# Запускаем основное приложение
exec npm start
