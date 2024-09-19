const categoryModel = require('#models/categoryModel');

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const { name, limit, page } = req.query;
      const result = await categoryModel.getCategories({
        name,
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      });
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching categories', error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await categoryModel.deleteCategory(id);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error deleting category', error: error.message });
    }
  },
};

module.exports = categoryController;
