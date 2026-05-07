import { nanoid } from "nanoid";
import pool from "../../config/db.js";

class JobsRepositories {
  constructor() {
    this.pool = pool;
  }

  async createJobs({
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  }) {
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO jobs(id, company_id, category_id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
      values: [
        id,
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        status,
      ],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getAllJobs(filters = {}) {
    const conditions = [];
    const values = [];
    let paramIndex = 1;

    if (filters.title) {
      conditions.push(`j.title ILIKE $${paramIndex++}`);
      values.push(`%${filters.title}%`);
    }

    if (filters.company_name) {
      conditions.push(`comp.name ILIKE $${paramIndex++}`);
      values.push(`%${filters.company_name}%`);
    }

    if (filters.category_name) {
      conditions.push(`c.name ILIKE $${paramIndex++}`);
      values.push(`%${filters.category_name}%`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = {
      text: `SELECT j.id, j.company_id, j.category_id, j.title, j.description, j.job_type, j.salary_min, j.salary_max, j.is_salary_visible, j.status, c.name as category_name, comp.name as company_name FROM jobs as j JOIN categories as c ON j.category_id = c.id JOIN companies as comp ON j.company_id = comp.id ${where}`,
      values,
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getJobsByCompanyId(company_id) {
    const query = {
      text: "SELECT j.id, j.company_id, j.category_id, j.title, j.description, j.job_type, j.salary_min, j.salary_max, j.is_salary_visible, j.status, c.name as category_name, comp.name as company_name FROM jobs as j JOIN categories as c ON j.category_id = c.id JOIN companies as comp ON j.company_id = comp.id WHERE j.company_id = $1",
      values: [company_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getJobsByCategoryId(category_id) {
    const query = {
      text: "SELECT j.id, j.company_id, j.category_id, j.title, j.description, j.job_type, j.salary_min, j.salary_max, j.is_salary_visible, j.status, c.name as category_name, comp.name as company_name FROM jobs as j JOIN categories as c ON j.category_id = c.id JOIN companies as comp ON j.company_id = comp.id WHERE j.category_id = $1",
      values: [category_id],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getJobsById(id) {
    const query = {
      text: "SELECT j.id, j.title, j.description, j.job_type, j.experience_level, j.location_type, j.location_city, j.salary_min, j.salary_max, j.is_salary_visible, j.status, c.name as category_name, comp.name as company_name FROM jobs as j JOIN categories as c ON j.category_id = c.id JOIN companies as comp ON j.company_id = comp.id WHERE j.id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async updateJobsById({
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  }) {
    let paramIndex = 2;
    const fields = [];
    const values = [id];

    if (company_id) {
      fields.push(`company_id = $${paramIndex++}`);
      values.push(company_id);
    }

    if (category_id) {
      fields.push(`category_id = $${paramIndex++}`);
      values.push(category_id);
    }

    if (title) {
      fields.push(`title = $${paramIndex++}`);
      values.push(title);
    }

    if (description) {
      fields.push(`description = $${paramIndex++}`);
      values.push(description);
    }

    if (job_type) {
      fields.push(`job_type = $${paramIndex++}`);
      values.push(job_type);
    }

    if (experience_level) {
      fields.push(`experience_level = $${paramIndex++}`);
      values.push(experience_level);
    }

    if (location_type) {
      fields.push(`location_type = $${paramIndex++}`);
      values.push(location_type);
    }

    if (location_city) {
      fields.push(`location_city = $${paramIndex++}`);
      values.push(location_city);
    }

    if (salary_min) {
      fields.push(`salary_min = $${paramIndex++}`);
      values.push(salary_min);
    }

    if (salary_max) {
      fields.push(`salary_max = $${paramIndex++}`);
      values.push(salary_max);
    }

    if (is_salary_visible !== undefined) {
      fields.push(`is_salary_visible = $${paramIndex++}`);
      values.push(is_salary_visible);
    }

    if (status) {
      fields.push(`status = $${paramIndex++}`);
      values.push(status);
    }

    const query = {
      text: `UPDATE jobs SET ${fields.join(", ")} WHERE id = $1 RETURNING id, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status`,
      values,
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteJobsById(id) {
    const query = {
      text: "DELETE FROM jobs WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

export default new JobsRepositories();
