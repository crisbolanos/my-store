const app = require('./index');

// Export a serverless handler that delegates to the Express app
module.exports = (req, res) => {
  return app(req, res);
};
