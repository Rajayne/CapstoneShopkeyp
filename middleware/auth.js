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

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new ExpressError('Unauthorized', 401);
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureAdmin(req, res, next) {
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
    if (!(user && (user.isAdmin || user.username === req.params.username))) {
      throw new ExpressError('Unauthorized', 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
};
