import { nanoid } from "nanoid";
import pool from "../../config/db.js";

class CategoriesRepositories {
  constructor() {
    this.pool = pool;
  }

  async createCategory(name) {
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO categories(id, name) VALUES($1, $2) RETURNING id, name",
      values: [id, name],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getCategory() {
    const query = {
      text: "SELECT * FROM categories",
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: "SELECT * FROM categories WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editCategory({ id, name }) {
    const updatedAt = new Date().toISOString();
    const fields = [];
    const values = [id];
    let paramIndex = 2;

    if (name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(name);
    }

    fields.push(`updated_at = $${paramIndex}`);
    values.push(updatedAt);

    const query = {
      text: `UPDATE categories SET ${fields.join(", ")} WHERE id = $1 RETURNING id, name`,
      values,
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteCategoryById(id) {
    const query = {
      text: "DELETE FROM categories WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

export default new CategoriesRepositories();