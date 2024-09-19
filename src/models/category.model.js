const connection = require('#src/configs/db');
const { promisify } = require('util');

const query = promisify(connection.query).bind(connection);

const categoryModel = {
  async getCategories({ name = '', limit = 10, page = 1 }) {
    try {
      const offset = (page - 1) * limit;
      const searchValue = `%${name}%`;

      const [categories, [{ total }]] = await Promise.all([
        query('SELECT * FROM category WHERE name LIKE ? LIMIT ? OFFSET ?', [
          searchValue,
          parseInt(limit),
          offset,
        ]),
        query('SELECT COUNT(*) as total FROM category WHERE name LIKE ?', [
          searchValue,
        ]),
      ]);

      return {
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          limit: parseInt(limit),
        },
        data: categories,
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  },

  async getCategoryById(id) {
    try {
      const [category] = await query('SELECT * FROM category WHERE id = ?', [
        id,
      ]);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw new Error('Failed to fetch category');
    }
  },

  async postCategory(data) {
    try {
      const result = await query('INSERT INTO category SET ?', [data]);
      return result;
    } catch (error) {
      console.error('Error adding category:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Category name already exists');
      }
      throw new Error('Failed to add category');
    }
  },

  async updateCategory(id, data) {
    try {
      const [existingCategory] = await query(
        'SELECT * FROM category WHERE id = ?',
        [id]
      );

      if (!existingCategory) {
        throw new Error('Category not found');
      }

      const result = await query('UPDATE category SET ? WHERE id = ?', [
        data,
        id,
      ]);
      return result;
    } catch (error) {
      console.error('Error updating category:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Category name already exists');
      }
      throw new Error('Failed to update category');
    }
  },

  async deleteCategory(id) {
    try {
      const [existingCategory] = await query(
        'SELECT * FROM category WHERE id = ?',
        [id]
      );

      if (!existingCategory) {
        throw new Error('Category not found');
      }

      const result = await query('DELETE FROM category WHERE id = ?', [id]);
      return result;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new Error('Failed to delete category');
    }
  },
};

module.exports = categoryModel;
