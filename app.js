/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const testDbConnection = require('./db/testDbConnection');
const config = require('./config/serverConfig');
const bot = require('./bot');

const sneakerRouter = require('./routes/api/sneakers');
const adminRouter = require('./routes/api/admin');
const orderRouter = require('./routes/api/orders');
const sizeRouter = require('./routes/api/size');
const userRouter = require('./routes/api/user');

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