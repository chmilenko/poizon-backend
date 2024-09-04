const TelegramBot = require('node-telegram-bot-api');

const token = '6904170138:AAG2YsuiQGcm0cF0xtyQvoiJz6dO251B5zg';
const bot = new TelegramBot(token, { polling: true });

module.exports = bot;
