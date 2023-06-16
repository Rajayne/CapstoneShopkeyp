const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const ExpressError = require('../expressError');

// Authenticate user token
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, '').trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

function requireLogin(req, res, next) {
  try {
    if (!res.locals.user) throw new ExpressError('Unauthorized', 401);
    return next();
  } catch (err) {
    return next(err);
  }
}

function requireAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new ExpressError('Unauthorized', 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureCorrectUserOrAdmin(req, res, next) {
  try {
    const { user } = res.locals;
    console.log(user.username === req.body.toUser);
    if (
      !(
        user &&
        (user.isAdmin ||
          user.username === req.params.username ||
          user.username === req.body.toUser)
      )
    ) {
      throw new ExpressError('Unauthorized', 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  requireLogin,
  requireAdmin,
  ensureCorrectUserOrAdmin,
};
