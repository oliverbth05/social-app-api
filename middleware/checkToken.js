const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    if (req.path === '/login' || req.path === '/register' || req.path === '/stats/') {
      next();
    }
    else {
      const token = req.get('Authorization');
      let verified = jwt.verify(token, 'secret');
      if (verified) {
        next()
      }
    }
  }
  catch (err) {
    res.status(401).json()
  }
}