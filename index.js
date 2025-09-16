const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello mi server en express');
});


routerApi(app);
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



