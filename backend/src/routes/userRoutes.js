// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

module.exports = (pool, jwtMiddleware) => {
  // Rota de registro de usuário
  router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = await userController.addUser(pool, username, password);
      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Rota de login de usuário
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await userController.loginUser(pool, username, password);

      if (user) {
        res.json({ user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Outras rotas relacionadas ao usuário podem ser adicionadas aqui...

  return router;
};
