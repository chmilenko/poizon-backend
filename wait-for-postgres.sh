#!/bin/sh

until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database connection at $DB_HOST:$DB_PORT..."
  sleep 1
done

echo "Database is up at $DB_HOST:$DB_PORT!"