/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const { authenticateJWT } = require('./middleware/auth');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use('/auth', authRoute);
app.use('/users', usersRoute);

/** General error handler */
app.use((err, req, res) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
