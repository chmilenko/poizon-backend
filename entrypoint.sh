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

# Проверяем, существует ли база данных
if ! psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\l'; then
    echo "Creating database $DB_NAME"
    createdb -h "$DB_HOST" -U "$DB_USER" "$DB_NAME"
fi

# Создаем базу данных (если необходимо)
npx sequelize db:create

# Накатываем миграции
npx sequelize-cli db:migrate

# Загружаем начальные данные (seed)
npx sequelize db:seed:all --debug

# Запускаем основное приложение
exec npm start