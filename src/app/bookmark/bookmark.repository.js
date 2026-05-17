import { nanoid } from "nanoid";
import pool from "../../config/db.js";

class BookmarksRepositories {
  constructor() {
    this.pool = pool;
  }

  async createBookmark(user_id, job_id) {
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO bookmarks(id, user_id, job_id) VALUES($1, $2, $3) RETURNING id, user_id, job_id",
      values: [id, user_id, job_id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getAllUserBookmarks(user_id) {
    const query = {
      text: `SELECT 
            b.id, b.user_id, b.job_id, b.created_at,
            j.title as job_title, j.job_type, j.experience_level, j.location_type, 
            j.location_city, j.salary_min, j.salary_max, j.is_salary_visible, 
            j.status as job_status, j.created_at as job_created_at, j.updated_at as job_updated_at,
            c.name as category_name,
            comp.name as company_name,
            comp.location as company_location
           FROM bookmarks b
           JOIN jobs j ON b.job_id = j.id
           JOIN categories c ON j.category_id = c.id
           JOIN companies comp ON j.company_id = comp.id
           WHERE b.user_id = $1`,
      values: [user_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getBookmarkById(id) {
    const query = {
      text: "SELECT * FROM bookmarks WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteBookmarkByJobId(job_id) {
    const query = {
      text: "DELETE FROM bookmarks WHERE job_id = $1 RETURNING id, user_id, job_id",
      values: [job_id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

export default new BookmarksRepositories();
