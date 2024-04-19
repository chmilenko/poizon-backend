/* eslint-disable linebreak-style */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// eslint-disable-next-line linebreak-style
const sneakersRouter = require('express').Router();

const {
  ModelSneaker, Size, Mark, Photo, CountSize, Count,
} = require('../../db/models');
const photo = require('../../db/models/photo');

const fileMiddleware = require('../../middlewares/fileUpload');

sneakersRouter.get('/sneakers', async (req, res) => {
  try {
    const allSneakers = await ModelSneaker.findAll({
      include: [
        Mark,
        Photo,
        {
          model: CountSize,
          include: [Size, Count],
        },
      ],
    });
    const formattedSneakers = allSneakers.map((sneaker) => ({
      id: sneaker.id,
      name: sneaker.name,
      mark: sneaker.Mark.name,
      price: sneaker.price,
      createdAt: sneaker.createdAt,
      updatedAt: sneaker.updatedAt,
      photos: sneaker.Photos,
      sizes: sneaker.CountSizes.map((countSize) => ({
        size_id: countSize.Size.id,
        size: countSize.Size.size,
        count_id: countSize.Count.id,
        count: countSize.Count.count,
      })),
    }));
    res.status(200).json(formattedSneakers);
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
    } = req.body.data;

    const markName = typeof mark === 'object' ? mark.name : mark;

    let markInstance = await Mark.findOne({ where: { name: markName } });

    if (!markInstance) {
      markInstance = await Mark.create({
        name: markName,
      });
    }
    const modelName = typeof model === 'object' ? model.name : model;

    let modelInstance = await ModelSneaker.findOne({
      where: { name: modelName },
    });
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
      let sizeInstance = await Size.findOne({
        where: { model_sneaker_id: modelInstance.id, size },
      });
      if (!sizeInstance) {
        // eslint-disable-next-line no-await-in-loop
        sizeInstance = await Size.create({
          model_sneaker_id: modelInstance.id,
          size,
          count,
        });
      }
    }
    return res.status(201).json(modelInstance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

sneakersRouter.post(
  '/sneakers/photos/:id',
  fileMiddleware.fields([
    { name: 'mainPhoto', maxCount: 1 },
    { name: 'two', maxCount: 1 },
    { name: 'three', maxCount: 1 },
    { name: 'four', maxCount: 1 },
    { name: 'five', maxCount: 1 },
    { name: 'six', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const sneakerInstance = await ModelSneaker.findOne({ where: { id } });
      if (Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No photos provided.' });
      }
      const photoFields = ['mainPhoto', 'two', 'three', 'four', 'five', 'six'];
      const photosObject = { model_sneaker_id: sneakerInstance.id };

      for (const field of photoFields) {
        if (req.files[field] && req.files[field].length > 0) {
          photosObject[field] = req.files[field][0].path.replace('public', '');
        }
      }

      await Photo.create(photosObject);
      res.status(201).json({ message: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
);

sneakersRouter.put('/sneakers/:id', async (req, res) => {
  try {
    const {
      mark, model, price, sizeCounts,
    } = req.body;
    const { id } = req.params;

    const markName = typeof mark === 'object' ? mark.name : mark;
    let markInstance = await Mark.findOne({ where: { name: markName } });
    const modelName = typeof model === 'object' ? model.name : model;
    if (!markInstance) {
      markInstance = await Mark.create({
        name: markName,
      });
    }
    const modelInstance = await ModelSneaker.findOne({ where: { id } });

    const putModal = await modelInstance.update({
      name: modelName,
      mark_id: markInstance.id,
      price,
    });

    if (sizeCounts) {
      const currentSizes = await Size.findAll({
        where: { model_sneaker_id: id },
      });
      const currentSizeMap = new Map();
      for (const currentSize of currentSizes) {
        currentSizeMap.set(currentSize.size, currentSize);
      }

      const deletedSizes = [];

      for (const { size } of currentSizes) {
        if (!sizeCounts.find((item) => item.size === size)) {
          deletedSizes.push(size);
        }
      }

      if (deletedSizes.length > 0) {
        await Size.destroy({
          where: { model_sneaker_id: id, size: deletedSizes },
        });
      }

      for (const { size, count } of sizeCounts) {
        let sizeInstance = currentSizeMap.get(size);
        if (!sizeInstance) {
          sizeInstance = await Size.create({
            model_sneaker_id: id,
            size,
            count,
          });
        } else {
          await sizeInstance.update({
            count,
          });
        }
      }
    }

    res.status(200).json(putModal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
sneakersRouter.put('/sneakers/photos/:id', async (req, res) => {
  try {
    // const { id } = req.params;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

sneakersRouter.get('/sneakers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findSneaker = await ModelSneaker.findOne({
      where: { id },
      include: [
        Mark,
        Photo,
        {
          model: CountSize,
          include: [Size, Count],
        },
      ],
    });
    if (!findSneaker) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    const formattedSneaker = {
      id: findSneaker.id,
      name: findSneaker.name,
      mark: findSneaker.Mark.name,
      price: findSneaker.price,
      createdAt: findSneaker.createdAt,
      updatedAt: findSneaker.updatedAt,
      photos: findSneaker.Photos,
      sizes: findSneaker.CountSizes.map((countSize) => ({
        size_id: countSize.Size.id,
        size: countSize.Size.size,
        count_id: countSize.Count.id,
        count: countSize.Count.count,
      })),
    };

    res.status(200).json(formattedSneaker);
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
