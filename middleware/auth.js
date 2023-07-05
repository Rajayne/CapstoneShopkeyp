const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const ExpressError = require('../expressError');

// Authenticate user token
function authenticateJWT(req, res, next) {
  try {
    const authToken = req.headers && req.headers.authorization;
    if (authToken) {
      const token = authToken.replace(/^[Bb]earer /, '').trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next(err);
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
    if (!(user && (user.isAdmin || user.username === req.params.username))) {
      throw new ExpressError('Unauthorized', 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

function authorizePurchase(req, res, next) {
  try {
    const { user } = res.locals;
    if (!user.username === req.body.username) {
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
  authorizePurchase,
};
