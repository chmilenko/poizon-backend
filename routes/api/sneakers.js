const sneakersRouter = require('express').Router();
const {
  ModelSneaker, Size, Mark, Photo,
} = require('../../db/models');
// const fileMiddleware = require('../../middlewares/fileUpload');

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

sneakersRouter.get('/sneakers/mark', async (req, res) => {
  try {
    const marks = await Mark.findAll();
    res.status(201).json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
sneakersRouter.get('/sneakers/models', async (req, res) => {
  try {
    const models = await ModelSneaker.findAll();
    res.status(201).json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// eslint-disable-next-line consistent-return
sneakersRouter.post('/sneakers', async (req, res) => {
  try {
    const {
      mark, model, price, sizeCounts,
    } = req.body;
    console.log('DADADDATATA:', mark);
    let markName;
    if (typeof mark === 'string') {
      markName = mark;
    } else if (typeof mark === 'object' && mark !== null) {
      markName = mark.name;
    } else {
      throw new Error('Invalid format for `mark`');
    }

    let markInstance = await Mark.findOne({ where: { name: markName } });
    if (!markInstance) {
      markInstance = await Mark.create({
        name: markName,
      });
    }
    let modelName;
    if (typeof model === 'string') {
      modelName = model;
    } else if (typeof model === 'object' && model !== null) {
      modelName = model.name;
    } else {
      throw new Error('Invalid format for `mark`');
    }

    let modelInstance = await ModelSneaker.findOne({ where: { name: modelName } });
    if (!modelInstance) {
      modelInstance = await ModelSneaker.create({
        name: modelName,
        price,
        mark_id: markInstance.id,
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const { size, count } of sizeCounts) {
      // eslint-disable-next-line max-len, no-await-in-loop
      let sizeInstance = await Size.findOne({ where: { model_sneaker_id: modelInstance.id, size } });
      if (!sizeInstance) {
        // eslint-disable-next-line no-await-in-loop
        sizeInstance = await Size.create({
          model_sneaker_id: modelInstance.id,
          size,
          count,
        });
      }
    }

    const result = await ModelSneaker.findOne({
      where: { mark_id: markInstance.id },
      // include: [{ model: Mark }, { model: Size }, { model: Photo }],
    });

    return res.status(201).json(result);
  } catch (error) {
    // console.log(error);
    res.status(500).console.log(error);
  }
});

// eslint-disable-next-line consistent-return
sneakersRouter.post('/sneakers/photos', async (req, res) => {
  try {
    const { photos, id } = req.body;
    const sneakerInstance = await ModelSneaker.findOne({ where: { id } });
    if (photos && photos.length > 6) {
      return res.status(400).json({ message: 'Photos array should not have more than 6 items.' });
    }

    if (photos && photos.length) {
      await Photo.create({
        model_sneaker_id: sneakerInstance.id,
        mainPhoto: photos[0] || null,
        two: photos[1] || null,
        three: photos[2] || null,
        four: photos[3] || null,
        five: photos[4] || null,
        six: photos[5] || null,
      });
    }
    res.status(201).json({ message: 'success' });
  } catch (error) {
    console.log(error);
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
