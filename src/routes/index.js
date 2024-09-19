const express = require('express');
const category = require('./category.route');
const product = require('./product.route');
const routes = express.Router();

routes.use('/category', category);
routes.use('/product', product);

module.exports = routes;
