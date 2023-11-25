// src/controllers/productController.js
const Product = require('../models/productModel');

function getAllProducts(pool) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query('SELECT * FROM products');
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
}

// src/controllers/productController.js
function addProduct(pool, name, price, description) {
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await pool.query(
          'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING id, name, price, description',
          [name, price, description]
        );
        const newProduct = rows[0];
        const productWithId = new Product(newProduct.id, newProduct.name, newProduct.price, newProduct.description);
        resolve(productWithId);
      } catch (error) {
        reject(error);
      }
    });
  }
  

function getProductById(pool, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      resolve(rows[0]);
    } catch (error) {
      reject(error);
    }
  });
}

function updateProductById(pool, id, name, price, description) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(
        'UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *',
        [name, price, description, id]
      );
      resolve(rows[0]);
    } catch (error) {
      reject(error);
    }
  });
}

function deleteProductById(pool, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
      resolve(rows[0]);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
