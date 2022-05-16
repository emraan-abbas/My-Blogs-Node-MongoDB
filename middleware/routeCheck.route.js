const jwt = require('jsonwebtoken');


// Check for Authenticated Routes

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // const decoded = jwt.verify(token, 'mySecretKey');
    // req.body = decoded;
    next();
  }
  catch (error) {
    return res.status(400).json({
      message: 'Not Authorized for this route !',
      error
    })
  }
};

