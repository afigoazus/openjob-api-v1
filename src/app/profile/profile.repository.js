import pool from "../../config/db.js";

class ProfileRepositories {
  constructor() {
    this.pool = pool;
  }

  async getUserProfile(id) {
    const query = {
      text: "SELECT id, name, email, role FROM users WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getUserApplicant(user_id) {
    const query = {
      text: "SELECT a.id, a.job_id, a.user_id, a.status, j.title as job_title, j.job_type FROM applications as a JOIN jobs as j on a.job_id = j.id WHERE a.user_id = $1",
      values: [user_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getUserBookMarks(user_id) {
    const query = {
      text: "SELECT b.id, b.job_id, b.user_id, j.title as job_title FROM bookmarks as b JOIN jobs as j ON b.job_id = j.id WHERE b.user_id = $1",
      values: [user_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }
}

export default new ProfileRepositories();
