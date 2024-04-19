const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { Admin } = require('../../db/models');

authRouter.get('/verification', async (req, res) => {
  const { user } = res.locals;
  if (user) {
    res.json({
      user,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

authRouter.post('/authenication', async (req, res) => {
  try {
    const { login, password } = req.body;
    const existingUser = await Admin.findOne({ where: { login } });
    if (
      existingUser
      && (await bcrypt.compare(password, existingUser.password))
    ) {
      req.session.userId = existingUser.id;
      res.status(201).json({
        id: existingUser.id,
        login: existingUser.login,
      });
    } else {
      res.status(401).json({
        error: 'Неверные учетные данные',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post('/logout', (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('user_sid');
      res.json({ success: true });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authRouter;
