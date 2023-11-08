const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const getUser = require('../middlewares/getUser');
// const getStatic = require('../middlewares/static');
const sessionConfig = require('./sessionConfig');

function config(app) {
  // миддлварки (middlewares, промежуточные фукнции):

  // позволяет запрашивать статический контент
  // (файлы, которые лежат в / public) с нашего сервера
  // app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.resolve('public')));
  // при отправке формы методом POST данные из формы приходят
  // не сервер в зашифрованном виде
  // эта миддлварка расшифровывает их и кладёт в req.body
  app.use(express.urlencoded({ extended: true }));

  // расшифровывает json, который отправляется в запросах от клиента
  app.use(express.json());

  // логирование деталей запроса
  app.use(morgan('tiny'));

  // расшифровывает куки в запросах от клиента
  app.use(cookieParser());

  // миддлварка для работы с сессиями
  app.use(session(sessionConfig));
  app.disable('x-powered-by');

  app.use(getUser);
  // app.use(getStatic);
}

module.exports = config;
