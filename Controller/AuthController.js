const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

// Signup
const signup = async (req, res) => {
  const { Name, email, password } = req.body;

  db.query('SELECT * FROM users_table WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users_table (Name, email, password) VALUES (?, ?, ?)', [Name, email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ message: 'Error creating user', error: err });
      res.status(201).json({ message: 'User created successfully' });
    });
  });
};

// Login
const login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users_table WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user.Id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
};

module.exports = { signup, login };
