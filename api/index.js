const express = require('express');
const app = express();

const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://127.0.0.1:5500', 'https://myapp.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Health check
app.get('/', (req, res) => {
  res.send('Hello mi server en express');
});


routerApi(app);
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

// Only start the server in local development
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

// Export the app for Vercel serverless
module.exports = app;
