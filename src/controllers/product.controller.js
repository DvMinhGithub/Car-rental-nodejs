const productModel = require('#models/product.model');

const sendSuccessResponse = (
  res,
  data,
  statusCode = 200,
  message = 'Success'
) => {
  res.status(statusCode).json({
    code: statusCode,
    message,
    result: data,
  });
};

const sendErrorResponse = (res, error, statusCode = 500, message = 'Error') => {
  res.status(statusCode).json({
    code: statusCode,
    message,
    error: error.message,
  });
};

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const { name, limit = 10, page = 1 } = req.query;
      const result = await productModel.getProducts({
        name,
        limit: parseInt(limit),
        page: parseInt(page),
      });
      sendSuccessResponse(res, result);
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error fetching products');
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productModel.getProductById(id);
      sendSuccessResponse(res, result);
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error fetching product');
    }
  },

  addProduct: async (req, res) => {
    try {
      const body = { ...req.body, image: req.file.filename };
      const result = await productModel.postProduct(body);
      sendSuccessResponse(res, result, 201, 'Product added successfully');
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error adding product');
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const body = {
        ...req.body,
        ...(req.file && { image: req.file.filename }),
      };
      const result = await productModel.updateProduct(id, body);
      sendSuccessResponse(res, result);
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error updating product');
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productModel.deleteProduct(id);
      sendSuccessResponse(res, result);
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error deleting product');
    }
  },
};

module.exports = productController;
