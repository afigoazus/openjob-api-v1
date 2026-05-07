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
      text: "SELECT * FROM bookmarks WHERE user_id = $1",
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
