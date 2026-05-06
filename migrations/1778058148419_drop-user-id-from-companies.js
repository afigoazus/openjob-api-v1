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
  pgm.dropColumn("companies", ["user_id", "website"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.addColumn("companies", {
    user_id: {
      type: "varchar(50)",
      references: '"users"',
      notNull: true,
      onDelete: "CASCADE",
    },
    website: {
      type: "varchar(500)",
      notNull: true,
    },
  });
};
