/* eslint-disable no-console */
const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
