const { Admin } = require('../db/models');

module.exports = async function getUser(req, res, next) {
  if (req.session.userId) {
    const admin = await Admin.findOne({ where: { id: req.session.userId } });
    res.locals.admin = admin;
  }
  next();
};
