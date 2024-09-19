const express = require('express');
const category = require('./category.route');
const routes = express.Router();

routes.use('/category', category);

module.exports = routes;
