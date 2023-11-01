const sneakersRouter = require('express').Router();
const { ModelSneaker, Size, Mark } = require('../../db/models');

sneakersRouter.get('/sneakers', async (req, res) => {
  try {
    const allSneakers = await ModelSneaker.findAll({
      include: [{ model: Mark }, { model: Size }],

    });
    res.status(201).json(allSneakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = sneakersRouter;
