const sneakersRouter = require('express').Router();
const {
  ModelSneaker, Size, Mark, Photo,
} = require('../../db/models');
const fileMiddleware = require('../../middlewares/fileUpload');

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

    return res.status(201).json(modelInstance);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
});

sneakersRouter.post('/sneakers/photos/:id', fileMiddleware.fields([
  { name: 'mainPhoto', maxCount: 1 },
  { name: 'two', maxCount: 1 },
  { name: 'three', maxCount: 1 },
  { name: 'four', maxCount: 1 },
  { name: 'five', maxCount: 1 },
  { name: 'six', maxCount: 1 },
]), async (req, res) => {
  try {
    const { id } = req.params;
    const sneakerInstance = await ModelSneaker.findOne({ where: { id } });

    if (Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No photos provided.' });
    }

    const photoFields = ['mainPhoto', 'two', 'three', 'four', 'five', 'six'];
    const photosObject = { model_sneaker_id: sneakerInstance.id };

    // eslint-disable-next-line no-restricted-syntax
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
});

// sneakersRouter.get('/sneakers/nike', async (req, res) => {
//   try {
//     const allSneakers = await ModelSneaker.findAll({
//       include: [{ model: Mark, where: { name: 'Nike' } }, { model: Size }, { model: Photo }],

//     });
//     res.status(201).json(allSneakers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// sneakersRouter.get('/sneakers/newbalance', async (req, res) => {
//   try {
//     const allSneakers = await ModelSneaker.findAll({
//       include: [{ model: Mark, where: { name: 'New Balance' } }, { model: Size }, { model: Photo }],

//     });
//     res.status(201).json(allSneakers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// sneakersRouter.get('/sneakers/rickowens', async (req, res) => {
//   try {
//     const allSneakers = await ModelSneaker.findAll({
//       include: [{ model: Mark, where: { name: 'Rick owens' } }, { model: Size }, { model: Photo }],

//     });
//     res.status(201).json(allSneakers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

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
