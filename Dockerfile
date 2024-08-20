FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm install --production

# Установка bash для запуска скриптов
RUN apk add --no-cache bash

# Копирование остальных файлов
COPY . .

# Копирование entrypoint.sh
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Указываем команду для запуска приложения
CMD ["npm", "start"]

# Открываем порт приложения
EXPOSE 5000