// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // decoded содержит id пользователя
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }
};

module.exports = authenticateJWT;
