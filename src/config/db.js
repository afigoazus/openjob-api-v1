import pg from "pg";
import { logger } from "../utils/logger.js";

const { Pool } = pg;

const pool = new Pool();

pool.on("error", (err) => {
  logger.error(`Database pool error: ${err.message}`);
});

const originalQuery = pool.query.bind(pool);
pool.query = async (...args) => {
  try {
    return await originalQuery(...args);
  } catch (err) {
    const query = typeof args[0] === "object" ? args[0] : { text: args[0] };
    const location = err.table ? `table [${err.table}]${err.column ? ` column [${err.column}]` : ""}` : `query [${query.text}]`;
    logger.error(`Database query error on ${location}: ${err.message}`);
    throw err;
  }
};

export default pool;
