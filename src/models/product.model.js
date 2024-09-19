const connection = require('#src/configs/db');
const { promisify } = require('util');

const query = promisify(connection.query).bind(connection);

const productModel = {
  async getProducts({ name = '', limit = 10, page = 1 }) {
    try {
      const offset = (page - 1) * limit;
      const searchValue = `%${name}%`;

      const [products, [{ total }]] = await Promise.all([
        query('SELECT p.*, c.name as cname FROM product p JOIN category c ON p.category_id = c.id WHERE p.name LIKE ? LIMIT ? OFFSET ?', [
          searchValue,
          parseInt(limit),
          offset,
        ]),
        query('SELECT COUNT(*) as total FROM product WHERE name LIKE ?', [
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
        data: products,
      };
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw new Error('Failed to fetch products');
    }
  },

  async getProductById(id) {
    try {
      const [product] = await query('SELECT * FROM product WHERE id = ?', [
        id,
      ]);
      if (!product) {
        
        throw new Error('product not found');
      }
      return product;
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  },

  async postProduct(data) {
    try {
      const result = await query('INSERT INTO product SET ?', data);
      return result;
    } catch (error) {
      console.error('Error in postProduct:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('product name already exists');
      }
      throw error;
    }
  },

  async updateProduct(id, data) {
    try {
      const [existingProduct] = await query(
        'SELECT * FROM product WHERE id = ?',
        [id]
      );

      if (!existingProduct) {
        throw new Error('product not found');
      }

      const result = await query('UPDATE product SET ? WHERE id = ?', [
        data,
        id,
      ]);
      return result;
    } catch (error) {
      console.error('Error in updateProduct:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('product name already exists');
      }
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      const [existingProduct] = await query(
        'SELECT * FROM product WHERE id = ?',
        [id]
      );

      if (!existingProduct) {
        throw new Error('product not found');
      }

      const result = await query('DELETE FROM product WHERE id = ?', [id]);
      return result;
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  },
};

module.exports = productModel;
