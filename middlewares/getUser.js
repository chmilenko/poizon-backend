const { Admin } = require('../db/models');

module.exports = async function getUser(req, res, next) {
  if (req.session.userId) {
    const user = await Admin.findOne({ where: { id: req.session.userId } });
    res.locals.user = { id: user.id, login: user.login, password: user.password };
  }
  next();
};
