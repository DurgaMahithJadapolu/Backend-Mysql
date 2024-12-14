const bcrypt = require('bcryptjs');
const db = require('../db/db');

// Get user data
const getUser = (req, res) => {
  const userId = req.userId;

  db.query('SELECT id, name, email FROM users_table WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(results[0]);
  });
};

// Update user data
const updateUser = (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.userId;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password', error: err });

    db.query('UPDATE users_table SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, hashedPassword, userId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      if (results.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User data updated successfully' });
    });
  });
};

module.exports = { getUser, updateUser };
