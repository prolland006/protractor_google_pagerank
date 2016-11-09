const express = require('express');

module.exports.defineRoutes = function (router) {

  router.get('/', function (req, res, next) {
    console.log('GET FROM BACKEND!')
    res.send();
  });

  router.post('/users/:userId/images', function (req, res) {
    console.log('POST FROM BACKEND!')
    res.send();
  });

};
