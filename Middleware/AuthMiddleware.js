const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(403).json({ message: 'Access denied, token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.userId = decoded.userId;
    next();
  });
};

module.exports = { verifyToken };
