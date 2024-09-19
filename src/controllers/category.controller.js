const categoryModel = require('#models/category.model');

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

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const { name, limit = 10, page = 1 } = req.query;
      const result = await categoryModel.getCategories({
        name,
        limit: parseInt(limit),
        page: parseInt(page),
      });
      sendSuccessResponse(res, result);
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error fetching categories');
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await categoryModel.getCategoryById(id);
      sendSuccessResponse(res, result);
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error fetching category');
    }
  },

  addCategory: async (req, res) => {
    try {
      const result = await categoryModel.postCategory(req.body);
      sendSuccessResponse(res, result, 201, 'Category added successfully');
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error adding category');
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await categoryModel.updateCategory(id, req.body);
      sendSuccessResponse(res, result);
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error updating category');
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await categoryModel.deleteCategory(id);
      sendSuccessResponse(res, result);
    } catch (error) {
      sendErrorResponse(res, error, 500, 'Error deleting category');
    }
  },
};

module.exports = categoryController;
