// src/controllers/userController.js
const User = require('../models/userModel');

async function addUser(pool, username, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username', [username, password]);
      const newUser = rows[0];
      const userWithId = new User(newUser.id, newUser.username);
      resolve(userWithId);
    } catch (error) {
      reject(error);
    }
  });
}

async function loginUser(pool, username, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

      if (rows.length === 1) {
        const user = new User(rows[0].id, rows[0].username);
        resolve(user);
      } else {
        resolve(null); // Usuário não encontrado
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  addUser,
  loginUser,
};
