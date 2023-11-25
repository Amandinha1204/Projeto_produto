const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { Pool } = require('pg');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: 'aluno_20201214010021',
  host: '177.136.201.182',
  database: 'temp',
  password: '128407',
  port: 5439,
});

app.use(bodyParser.json());
app.use(cors());
app.use('/products', productRoutes(pool));
app.use('/users', userRoutes(pool));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
