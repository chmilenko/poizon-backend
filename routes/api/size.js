const sizesRouter = require('express').Router();
const {
  Size, Count,
} = require('../../db/models');

sizesRouter.get('/sizes', async (req, res) => {
  try {
    const allSizes = await Size.findAll();
    res.status(200).json(allSizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sizesRouter.get('/count', async (req, res) => {
  try {
    const counts = await Count.findAll();
    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = sizesRouter;
