const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin } = require('../../db/models');

const { SECRET_KEY } = process.env;

authRouter.post('/authenication', async (req, res) => {
  try {
    const { login, password } = req.body.data;
    const existingUser = await Admin.findOne({ where: { login } });
    if (
      existingUser
      && (await bcrypt.compare(password, existingUser.password))
    ) {
      const token = jwt.sign({ id: existingUser.id }, SECRET_KEY, {
        expiresIn: '720h',
      });
      res.status(201).json({ token });
    } else {
      res.status(401).json({ error: 'Неверные учетные данные' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post('/token', async (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    res.json({ valid: true });
  } catch (error) {
    res.json({ valid: false });
  }
});

module.exports = authRouter;
