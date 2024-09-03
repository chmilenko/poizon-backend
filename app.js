/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');
const { User } = require('./db/models');
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

const webAppUrl = 'https://poizon-discount.ru/';

const app = express();
const PORT = process.env.PORT ?? 5000;

config(app);

const corsOptions = {
  origin: '*',
};

const hello = `✨ Добро пожаловать в мир кроссовок с poizon-discount! ✨

Мы — ваш надежный помощник в поиске идеальных кроссовок по лучшим ценам! Наш бот предлагает широкий выбор моделей от популярных брендов, акционные предложения и эксклюзивные скидки, которые невозможно пропустить. Просто укажите ваши предпочтения, и мы подберем для вас лучшие варианты!

👟 Что мы предлагаем?
- Широкий ассортимент: от классических моделей до новинок сезона.
- Акции и скидки: отслеживайте лучшие предложения и экономьте на любимых кроссовках.
- Индивидуальные рекомендации: на основе ваших вкусов и стиля.
- Надежная информация о наличии: получите актуальные данные с высвечиванием доступных размеров.

🚀 Как это работает?
1. Нажмите на кнопку "Сайт" и выберите категорию кроссовок.
2. Получите список доступных моделей со скидками.
3. Выберите понравившуюся пару и оформите заказ в несколько кликов!

💬 Поддержка 24/7: у вас возникли вопросы? Наша команда всегда готова помочь вам выбрать идеальные кроссовки!

Пробуйте poizon-discount – мы сделаем шопинг приятным, простым и выгодным! 🌟`;

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

let isProcessing = false;

bot.on('message', async (msg) => {
  if (isProcessing) return; // Игнорировать последующие сообщения
  isProcessing = true;

  const chatId = msg.chat.id;
  const { text } = msg;

  if (text === '/start') {
    const userName = msg.from.username || msg.from.first_name;

    try {
      let userInstance = await User.findOne({ where: { name: userName } });

      if (!userInstance) {
        userInstance = await User.create({ name: userName, chatId });
      } else {
        await User.update(
          {chatId},
          {
            where: {
              name: userInstance.name
            }
          }
        )
        userInstance.chatId = chatId;
        await userInstance.save();
      }

      await bot.sendMessage(chatId, hello, {
        reply_markup: {
          keyboard: [
            [{ text: 'В магазин', web_app: { url: `${webAppUrl}` } }],
          ],
        },
      });
    } catch (error) {
      console.error('Ошибка при работе с пользователем:', error);
      await bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте снова позже.');
    }
  }

  isProcessing = false; // Завершить обработку
});
