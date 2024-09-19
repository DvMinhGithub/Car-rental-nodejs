const productController = require('#controllers/product.controller');
const express = require('express');
const uploadFile = require('../midlewares/upload');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', uploadFile.single('image'), productController.addProduct);
router.put('/:id', uploadFile.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
