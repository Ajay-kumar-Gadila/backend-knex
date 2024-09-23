import knex from 'knex';
import knexConfig from '../knexfile.js';

// Setup Knex instance with development config
const db = knex(knexConfig.development);

// Run the migration
export const runMigration = async () => {
  try {
    await db.migrate.latest();
    console.log('Migrations have been run successfully.');
  } catch (err) {
    console.error('Error running migration:', err);
  } finally {
    await db.destroy(); // Ensure to close the database connection
  }
};

// Export the Knex instance for use in routes
export default db;
