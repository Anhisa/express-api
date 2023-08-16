const express = require('express');
const ProductsService = require('../services/products.service');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/products.schema');
const { validatorHandler } = require('../middlewares/validator.handler');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
  );

  router.post('/',
  validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res
    .status(201)
    .json({ message: 'Product created succesfully', body: newProduct });
});

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const modProduct = await service.update(id, body);
      res.status(201).json(modProduct);
    } catch (error) {
      next();
    }
  },
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const delProduct = await service.delete(id);
    res.status(202).json(delProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
