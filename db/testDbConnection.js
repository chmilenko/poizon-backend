const db = require('./models');

async function testDbConnection() {
  try {
    await db.sequelize.authenticate({ logging: false });
    console.log('БД подключена успешно');
  } catch (error) {
    console.log('Ошибка подключения к БД');

    console.log(error.message);
  }
}

module.exports = testDbConnection;
