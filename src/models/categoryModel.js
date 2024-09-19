const connection = require('#src/configs/db');

const categoryModel = {
  getCategories: ({ name, limit = 10, page = 1 }) => {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      const searchValue = `%${name || ''}%`;

      const dataQuery = `SELECT * FROM category WHERE name LIKE ? LIMIT ? OFFSET ?`;
      const countQuery = `SELECT COUNT(*) as total FROM category`;

      connection.query(
        dataQuery,
        [searchValue, limit, offset],
        (error, categories) => {
          if (error) {
            reject(new Error('Failed to fetch categories'));
            return;
          }

          connection.query(countQuery, [searchValue], (error, countResult) => {
            if (error) {
              reject(new Error('Failed to fetch total count'));
              return;
            }

            const total = countResult[0].total;
            resolve({
              pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                limit,
              },
              data: categories,
            });
          });
        }
      );
    });
  },

  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM category WHERE id = ?',
        [id],
        (error, results) => {
          if (error) {
            reject(new Error('Failed to fetch category'));
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  },

  postCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO category SET ?', data, (error, results) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(results);
        }
      });
    });
  },

  updateCategory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM category WHERE id = ?',
        [id],
        (error, results) => {
          if (error) {
            reject(new Error('Error checking category existence'));
          } else if (results.length === 0) {
            reject(new Error('Category not found'));
          } else {
            connection.query(
              'UPDATE category SET ? WHERE id = ?',
              [data, id],
              (updateError, updateResults) => {
                if (updateError) {
                  switch (updateError.code) {
                    case 'ER_DUP_ENTRY':
                      reject(new Error('Category name already exists'));
                      break;
                    default:
                      reject(new Error(updateError.message));
                      break;
                  }
                } else {
                  resolve(updateResults);
                }
              }
            );
          }
        }
      );
    });
  },

  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM category WHERE id = ?',
        id,
        (error, results) => {
          if (error) {
            reject(new Error('Failed to delete category'));
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};

module.exports = categoryModel;
