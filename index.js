const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());
const whitelist = ['http://127.0.0.1:5500', 'https://myapp.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

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



