import { nanoid } from "nanoid";
import pool from "../../config/db.js";

class ApplicationsRepositories {
  constructor() {
    this.pool = pool;
  }

  async createApplication({ job_id, user_id }) {
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO applications(id, job_id, user_id) VALUES($1, $2, $3) RETURNING id, job_id, user_id, status",
      values: [id, job_id, user_id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getAllApplications() {
    const query = {
      text: `SELECT 
            a.id, a.job_id, a.user_id, a.status, a.created_at, a.updated_at,
            j.title as job_title, j.job_type, j.location_city, j.location_type,
            j.salary_min, j.salary_max,
            comp.name as company_name
           FROM applications a
           JOIN jobs j ON a.job_id = j.id
           JOIN companies comp ON j.company_id = comp.id`,
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getApplicationById(id) {
    const query = {
      text: "SELECT * FROM applications WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getApplicationByUserId(user_id) {
    const query = {
      text: `SELECT 
            a.id, a.job_id, a.user_id, a.status, a.created_at, a.updated_at,
            j.title as job_title, j.job_type, j.location_city, j.location_type,
            j.salary_min, j.salary_max,
            comp.name as company_name
           FROM applications a
           JOIN jobs j ON a.job_id = j.id
           JOIN companies comp ON j.company_id = comp.id
           WHERE a.user_id = $1`,
      values: [user_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getApplicationByJobsId(jobs_id) {
    const query = {
      text: `SELECT 
            a.id, a.job_id, a.user_id, a.status, a.created_at, a.updated_at,
            j.title as job_title, j.job_type, j.location_city, j.location_type,
            j.salary_min, j.salary_max,
            comp.name as company_name
           FROM applications a
           JOIN jobs j ON a.job_id = j.id
           JOIN companies comp ON j.company_id = comp.id
           WHERE a.job_id = $1`,
      values: [jobs_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async updateApplicationStatusById(id, status) {
    const query = {
      text: "UPDATE applications SET status = $1 WHERE id = $2 RETURNING id, user_id, job_id, status",
      values: [status, id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteApplicationById(id) {
    const query = {
      text: "DELETE FROM applications WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

}

export default new ApplicationsRepositories();
