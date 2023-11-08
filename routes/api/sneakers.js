const sneakersRouter = require('express').Router();
const {
  ModelSneaker, Size, Mark, Photo,
} = require('../../db/models');

sneakersRouter.get('/sneakers', async (req, res) => {
  try {
    const allSneakers = await ModelSneaker.findAll({
      include: [{ model: Mark }, { model: Size }, { model: Photo }],

    });
    res.status(201).json(allSneakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sneakersRouter.post('/sneakers', async (req, res) => {
  try {
    const {
      mark, model, price, sizes, counts,
    } = req.body;

    let markInstance = await Mark.findOne({ where: { name: mark } });
    if (!markInstance) {
      markInstance = await Mark.create({
        name: mark,
      });
    }

    const sneakerInstance = await ModelSneaker.create({
      mark_id: markInstance.id,
      name: model,
      price,
    });

    // Обработка массива sizes и counts
    if (sizes.length !== counts.length) {
      return res.status(400).json({ message: 'Sizes and counts arrays should have the same length.' });
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sizes.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await Size.create({
        model_sneaker_id: sneakerInstance.id,
        size: sizes[i],
        count: counts[i],
      });
    }

    const result = await ModelSneaker.findOne({
      where: { id: sneakerInstance.id },
      include: [{ model: Mark }, { model: Size }],
    });

    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sneakersRouter.get('/sneakers/nike', async (req, res) => {
  try {
    const allSneakers = await ModelSneaker.findAll({
      include: [{ model: Mark, where: { name: 'Nike' } }, { model: Size }, { model: Photo }],

    });
    res.status(201).json(allSneakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sneakersRouter.get('/sneakers/newbalance', async (req, res) => {
  try {
    const allSneakers = await ModelSneaker.findAll({
      include: [{ model: Mark, where: { name: 'New Balance' } }, { model: Size }, { model: Photo }],

    });
    res.status(201).json(allSneakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sneakersRouter.get('/sneakers/rickowens', async (req, res) => {
  try {
    const allSneakers = await ModelSneaker.findAll({
      include: [{ model: Mark, where: { name: 'Rick owens' } }, { model: Size }, { model: Photo }],

    });
    res.status(201).json(allSneakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sneakersRouter.get('/sneakers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findSniker = await ModelSneaker.findOne({
      include: [{ model: Mark }, { model: Size }, { model: Photo }],
      where: { id },
    });
    res.status(201).json(findSniker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sneakersRouter.delete('/sneakers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ModelSneaker.destroy({
      include: [{ model: Mark }, { model: Size }, { model: Photo }],
      where: { id },
    });
    res.status(201).json(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = sneakersRouter;
