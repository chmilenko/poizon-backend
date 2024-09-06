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

const textSupport = `💬Чат @kornov112
(Отзывы и общение)

👨‍💻Админ @kornov112
(Вопросы по заказу )

👑 ГЛАВНЫЙ @kornov112
(Cотрудничество, жалобы на @poison_discount_bot)`;

const channelText  = `
ПОДПИСЫВАЙСЯ НА КАНАЛ 
👉  https://t.me/discountPoizon

Всегда будешь в курсе
🔥НОВИНКИ И АКЦИИ🔥
✨КУПОНЫ И СКИДКИ✨

ВСЕГДА ДЕЙСТВУЕТ
💥РОЗЫГРЫШ💥
Для участия надо просто нажать на кнопку 🔴`

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
            [{ text: '👟 В магазин 👟', web_app: { url: webAppUrl } }],
            [{ text: '❓ FAQ ❓' }],
            [{ text: '👨‍💻 Поддержка 👨‍💻' }],
            [{ text: '👨‍👩‍👦‍👦 Канал 👨‍👩‍👦‍👦' }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    } catch (error) {
      console.error('Ошибка при работе с пользователем:', error);
      await bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте снова позже.');
    }
  } else if (text === '❓ FAQ ❓') {
    await bot.sendMessage(chatId, 'Выберите один из следующих пунктов:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Что такое Poizon-Discount?', callback_data: 'faq_1' },
            { text: 'Адрес самовывоза?', callback_data: 'faq_2' },
          ],
          [
            { text: 'Как связаться с поддержкой?', callback_data: 'faq_3' },
          ],
        ],
      },
    });
  } else if (text === '👨‍💻 Поддержка 👨‍💻') {
    await bot.sendMessage(chatId, textSupport);
  } else if (text === '👨‍👩‍👦‍👦 Канал 👨‍👩‍👦‍👦') {
    await bot.sendMessage(chatId, channelText);
  }
  isProcessing = false;
});

bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const query = callbackQuery.data;

  switch (query) {
    case 'faq_1':
      await bot.sendMessage(chatId, 'Poizon-Discount - это онлайн-магазин, специализирующийся на продаже кроссовок с популярной площадки Poizon!');
      break;
    case 'faq_2':
      await bot.sendMessage(chatId, 'Адрес самовывоза находится по адресу: Санкт-Петербуг, Лиговский прсопект 55');
      break;
    case 'faq_3':
      await bot.sendMessage(chatId, textSupport);
      break;
    default:
      await bot.sendMessage(chatId, 'Неизвестный запрос!');
  }

  await bot.answerCallbackQuery(callbackQuery.id);
});

module.exports = bot;
