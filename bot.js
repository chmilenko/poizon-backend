/* eslint-disable no-console */
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { User } = require('./db/models');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

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

const webAppUrl = 'https://poizon-discount.ru/';

let isProcessing = false;

bot.on('message', async (msg) => {
  if (isProcessing) return;
  isProcessing = true;

  const chatId = msg.chat.id;
  const { text } = msg;

  if (text === '/start') {
    const userName = msg.from.username || msg.from.first_name;

    try {
      // Логика работы с пользователем
      let userInstance = await User.findOne({ where: { name: userName } });

      if (!userInstance) {
        userInstance = await User.create({ name: userName, chatid: chatId });
      } else {
        await User.update(
          { chatid: chatId },
          {
            where: {
              name: userInstance.name,
            },
          },
        );
      }

      await bot.sendMessage(chatId, hello, {
        reply_markup: {
          keyboard: [
            [{ text: 'В магазин', web_app: { url: webAppUrl } }],
          ],
        },
      });
    } catch (error) {
      console.error('Ошибка при работе с пользователем:', error);
      await bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте снова позже.');
    }
  }

  isProcessing = false;
});

module.exports = bot;