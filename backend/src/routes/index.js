// src/routes/index.js
const express = require('express');
const { Pool } = require('pg');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

const pool = new Pool({
  user: 'aluno_20201214010021',
  host: '177.136.201.182',
  database: 'temp',
  password: '128407',
  port: 5439,
});

const router = express.Router();

router.use('/products', productRoutes(pool));
router.use('/users', userRoutes(pool));

module.exports = router;
