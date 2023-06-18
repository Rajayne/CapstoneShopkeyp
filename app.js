/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import cors from 'cors';
import ExpressError from './expressError.js';
import { authenticateJWT } from './middleware/auth.js';

import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import adminRoute from './routes/admin.js';
import shopRoute from './routes/shop.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/admin', adminRoute);
app.use('/shop', shopRoute);

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

export default app;
