const express = require('express');
const category = require('./categoryRoute');
const routes = express.Router();

routes.use('/category', category);

module.exports = routes;
