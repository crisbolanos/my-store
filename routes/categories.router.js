const express = require('express');
const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categories.schemas');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
  try {
    const { body } = req;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedCategory = await service.update(id, body);
    res.status(201).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await service.delete(id);
    res.status(201).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
