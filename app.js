/* eslint-disable no-console */
require('dotenv').config();
const { User } = require("./db/models");


const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');
const config = require('./config/serverConfig');
const testDbConnection = require('./db/testDbConnection');
// const { telegramToken } = require('./config');

const bot = new TelegramBot('6904170138:AAG2YsuiQGcm0cF0xtyQvoiJz6dO251B5zg', {
  polling: true,
});

const sneakerRouter = require('./routes/api/sneakers');
const adminRouter = require('./routes/api/admin');
const orderRouter = require('./routes/api/orders');
const sizeRouter = require('./routes/api/size');
const userRouter = require('./routes/api/user');

const webAppUrl = 'https://gentle-sprite-12b05e.netlify.app';

const app = express();
const PORT = process.env.PORT ?? 5000;

config(app);

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use('/api', sneakerRouter);
app.use('/api', adminRouter);
app.use('/api', orderRouter);
app.use('/api', adminRouter);
app.use('/api', sizeRouter);
app.use('/api', userRouter);

app.use((error, req, res, next) => {
  console.error('Произошла ошибка', error);
  res.status(500).json({
    success: false,
    message: 'Непредвиденная ошибка сервера, попробуйте зайти позже',
  });
  next();
});

app
  .listen(PORT, () => {
    console.log(`сервер запущен на порту ${PORT}`);
    testDbConnection();
  })
  .on('error', (error) => {
    console.log('Ошибка веб-сервера');
    console.log(error.message);
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const { text } = msg;
  
    if (text === '/start') {
      const userName = msg.from.username || msg.from.first_name;
      
      let userInstance = await User.findOne({ where: { name: userName } });
      if (!userInstance) {
        userInstance = await User.create({ name: userName, chatId });
      } else {
        userInstance.chatId = chatId;
        await userInstance.save();
      }
  
      await bot.sendMessage(chatId, 'Ваш chatId сохранен. Приветствую вас!', {
        reply_markup: {
          keyboard: [
            [{ text: 'В магазин', web_app: { url: `${webAppUrl}` } }],
          ],
        },
      });
    }
  });
