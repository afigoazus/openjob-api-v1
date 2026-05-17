import { nanoid } from "nanoid";
import pool from "../../config/db.js";
// import CacheService from "../cache/redis.service.js";

class CompanyRepositories {
  constructor() {
    this.pool = pool;
  }

  async createCompany({ name, description, location, user_id }) {
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO companies(id, name, description, location, user_id) VALUES($1, $2, $3, $4, $5) RETURNING id, name, description, location",
      values: [id, name, description, location, user_id],
    };

    const result = await this.pool.query(query);

    // await this.cacheService.deleteCache("companies");

    return result.rows[0];
  }

  async getCompany() {
    const query = {
      text: "SELECT id, name, description, location, created_at, updated_at FROM companies",
    };

    const result = await this.pool.query(query);

    // await this.cacheService.set("companies", JSON.stringify(result.rows));

    return result.rows;
  }

  async getCompanyById(id) {
    const query = {
      text: "SELECT * FROM companies WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editCompany({ id, name, location, description }) {
    const updatedAt = new Date().toISOString();
    const fields = [];
    const values = [id];
    let paramIndex = 2;

    if (name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (location !== undefined) {
      fields.push(`location = $${paramIndex++}`);
      values.push(location);
    }

    fields.push(`updated_at = $${paramIndex}`);
    values.push(updatedAt);

    const query = {
      text: `UPDATE companies SET ${fields.join(", ")} WHERE id = $1 RETURNING id, name, description, location`,
      values,
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteCompanyById(id) {
    const query = {
      text: "DELETE FROM companies WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

export default new CompanyRepositories();
