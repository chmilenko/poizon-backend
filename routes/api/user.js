const userRouter = require("express").Router();
const { User } = require("../../db/models");

userRouter.get("/users", async (req, res) => {
  try {
    const users = User.findAll();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = userRouter;
