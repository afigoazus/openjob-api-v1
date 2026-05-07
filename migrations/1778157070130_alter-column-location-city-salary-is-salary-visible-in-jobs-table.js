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
  pgm.alterColumn("jobs", "location_city", { type: "varchar(255)", notNull: false });
  pgm.alterColumn("jobs", "salary_min", { type: "integer", notNull: false });
  pgm.alterColumn("jobs", "salary_max", { type: "integer", notNull: false });
  pgm.alterColumn("jobs", "is_salary_visible", { type: "boolean", notNull: true, default: false });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.alterColumn("jobs", "location_city", { type: "varchar(255)", notNull: true });
  pgm.alterColumn("jobs", "salary_min", { type: "integer", notNull: true });
  pgm.alterColumn("jobs", "salary_max", { type: "integer", notNull: true });
  pgm.alterColumn("jobs", "is_salary_visible", { type: "boolean", notNull: true });
};
