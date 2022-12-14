const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tagData = await Tag.findAll({
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try{
    const tagData = Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
    });

    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
    .then((updatedTag) => {
      res.json(updatedTag)
    })
  )
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!tagData) {
      res.status(404).json({ message: 'No category with this id was found!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
