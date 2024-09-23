export default {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'college_management'
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },
  staging: {
    client: 'mysql',
    connection: {
      host: 'staging-host',
      user: 'staging_user',
      password: 'staging_password',
      database: 'staging_database_name'
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'production-host',
      user: 'production_user',
      password: 'production_password',
      database: 'production_database_name'
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
};
