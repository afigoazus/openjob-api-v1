/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("jobs", {
    id: {
      type: "varchar(50)",
      primaryKey: true,
    },
    company_id: {
      type: "varchar(50)",
      notNull: true,
      references: "companies(id)",
      onDelete: "CASCADE",
    },
    category_id: {
      type: "varchar(50)",
      notNull: true,
      references: "categories(id)",
      onDelete: "CASCADE",
    },
    title: { type: "varchar(255)", notNull: true },
    description: { type: "text", notNull: true },
    salary_min: { type: "integer", notNull: true },
    salary_max: { type: "integer", notNull: true },
    location: { type: "varchar(255)", notNull: true },
    type: {
      type: "varchar(50)",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("jobs");
};
