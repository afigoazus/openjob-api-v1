import pool from "../../config/db.js";
import bcrypt from "bcrypt";
import AppError from "../../utils/error.js";

class AuthenticationRepositories {
  constructor() {
    this.pool = pool;
  }

  async addRefreshToken(id, token, userId) {
    const query = {
      text: `INSERT INTO refresh_tokens(id, user_id, token) VALUES($1, $2, $3)
             ON CONFLICT (user_id) DO UPDATE SET token = $3`,
      values: [id, userId, token],
    };

    await this.pool.query(query);
  }

  async deleteRefreshToken(token) {
    const query = {
      text: "DELETE FROM refresh_tokens WHERE token = $1",
      values: [token],
    };

    await this.pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: "SELECT token FROM refresh_tokens WHERE token = $1",
      values: [token],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const result = await this.pool.query(query);
    const user = result.rows[0];

    if (!user) throw new AppError(401, "Email atau password salah");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError(401, "Email atau password salah");

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default new AuthenticationRepositories();
