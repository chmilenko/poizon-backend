const userRouter = require('express').Router();
const { User } = require('../../db/models');
const authenticateJWT = require('../../middlewares/jwt');

userRouter.get('/users', authenticateJWT, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = userRouter;
