const sizesRouter = require('express').Router();
const {
  Size,
} = require('../../db/models');

sizesRouter.get('/sizes', async (req, res) => {
  try {
    const allSizes = await Size.findAll();
    res.status(200).json(allSizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = sizesRouter;
