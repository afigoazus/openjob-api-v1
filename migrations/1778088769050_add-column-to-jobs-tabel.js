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
  pgm.addColumn("jobs", {
    experience_level: {
      type: "varchar(255)",
      notNull: true,
    },
    location_type: {
      type: "varchar(255)",
      notNull: true,
    },
    is_salary_visible: {
      type: "boolean",
      notNull: true,
    },
    status: {
      type: "varchar(255)",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropColumn("jobs", "experience_level");
  pgm.dropColumn("jobs", "location_type");
  pgm.dropColumn("jobs", "is_salary_visible");
  pgm.dropColumn("jobs", "status");
};
