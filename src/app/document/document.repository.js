import { nanoid } from "nanoid";
import pool from "../../config/db.js";

class DocumentRepositories {
  constructor() {
    this.pool = pool;
  }

  async createDocument(user_id, name, url) {
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO documents(id, user_id, name, url) VALUES($1, $2, $3, $4) RETURNING *",
      values: [id, user_id, name, url],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getAllDocuments() {
    const query = {
      text: "SELECT * FROM documents",
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getDocumentsById(id) {
    const query = {
      text: "SELECT * FROM documents WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteDocumentById(id) {
    const query = {
      text: "DELETE FROM documents WHERE id = $1 RETURNING *",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

export default new DocumentRepositories();
