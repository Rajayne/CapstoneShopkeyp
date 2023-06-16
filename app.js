/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const { authenticateJWT } = require('./middleware/auth');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const ExpressError = require('./expressError');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/admin', adminRoute);
app.use('/shop', shopRoute);

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => next(new ExpressError('Not Found', 404)));

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
