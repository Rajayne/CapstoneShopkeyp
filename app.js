/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const { authenticateJWT } = require('./middleware/auth');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const transactionRoute = require('./routes/transactions');
const ExpressError = require('./expressError');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/admin', adminRoute);
app.use('/shop', shopRoute);
app.use('/transactions', transactionRoute);

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  const e = new ExpressError('Not Found', 404);
  next(e);
});
/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res) => {
  const status = err.status || 500;
  const message = err.message || 'Server Error';

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
