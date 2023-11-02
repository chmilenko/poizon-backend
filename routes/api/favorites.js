const favoritesRouter = require('express').Router();
const { Favorite, ModelSneaker } = require('../../db/models');

favoritesRouter.get('/favorites', async (req, res) => {
  try {
    const saved = await Favorite.findAll({

    });
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
});
