#!/bin/bash

# Ждем, пока база данных будет готова
./wait-for-postgres.sh

# Проверяем, существует ли база данных
if ! psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\l'; then
    echo "Creating database $DB_NAME"
    createdb -h "$DB_HOST" -U "$DB_USER" "$DB_NAME"
fi

# Накатываем миграции
npx sequelize-cli db:migrate

# Загружаем начальные данные
npx sequelize-cli db:seed:all

# Запускаем основное приложение
npm start