const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Конфигурация сессии
const sessionConfig = {
  // сессии будут храниться в файлах
  store: new FileStore(),
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
    // path: '/count'
  },
  staticPath: '/home/shirota/VscJS/POIZON BACKEND/poizon-backend/public/image',
};

module.exports = sessionConfig;
