// src/routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

module.exports = (pool) => {
  router.get('/', async (req, res) => {
    try {
      const allProducts = await productController.getAllProducts(pool);
      res.json({ products: allProducts });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/', async (req, res) => {
    const { name, price, description } = req.body;
    try {
      const newProduct = await productController.addProduct(pool, name, price, description);
      res.status(201).json({ product: newProduct });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
      const product = await productController.getProductById(pool, productId);
      if (product) {
        res.json({ product });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price, description } = req.body;
    try {
      const updatedProduct = await productController.updateProductById(pool, productId, name, price, description);
      if (updatedProduct) {
        res.json({ product: updatedProduct });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await productController.deleteProductById(pool, productId);
      if (deletedProduct) {
        res.json({ message: 'Product deleted successfully', deletedProduct });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};
