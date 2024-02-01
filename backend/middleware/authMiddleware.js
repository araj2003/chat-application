const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(404).json({
      error: 'token not found',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, id, user_name } = decoded;
    req.user = { email, id, user_name };
    next();
  } catch (error) {
    return res.status(404).json({
      error: 'invalid token',
    });
  }
};

module.exports = authenticationMiddleware;
