const express = require('express');

let router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

require('./image').defineRoutes(router);

