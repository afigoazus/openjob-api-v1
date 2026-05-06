import pool from "../../config/db.js";

class UserRepositories {
  constructor() {
    this.pool = pool;
  }

  async createUser({ id, name, email, password, role }) {
    const query = {
      text: "INSERT INTO users(id, name, email, password, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, role",
      values: [id, name, email, password, role],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async findUserByEmail(email) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async findUserById(id) {
    const query = {
      text: "SELECT id, name, email, role FROM users WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

}

export default new UserRepositories();
