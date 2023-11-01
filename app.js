const TelegramBot = require('node-telegram-bot-api');
const { telegramToken } = require('./config');

const webAppUrl = 'https://venerable-cascaron-a0c578.netlify.app';
const formUrl = 'https://venerable-cascaron-a0c578.netlify.app/form';

const bot = new TelegramBot(telegramToken, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const { text } = msg;
  if (text === '/start') {
    await bot.sendMessage(chatId, 'pognali nah', {
      reply_markup: {
        keyboard: [
          [{ text: 'Заполнить форму', web_app: { url: formUrl } }],
        ],
      },
    });
  }
  if (text === '/inline') {
    await bot.sendMessage(chatId, 'pognali', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'jopa pisya', web_app: { url: webAppUrl } }],
        ],

      },
    });
  }
  // отрисовываем в боте полученные данные с формы
  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);
      await bot.sendMessage(chatId, 'Спасибо за обратную связь');
      await bot.sendMessage(chatId, `Ваша страна:${data?.country}`);
      await bot.sendMessage(chatId, `Ваша улица:${data?.street}`);
      await bot.sendMessage(chatId, `Ваша страна:${data?.subject}`);

      setTimeout(() => {
        bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }
});
