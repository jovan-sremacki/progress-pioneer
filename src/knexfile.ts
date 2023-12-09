import { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASETEST,
      port: 5432
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  }
}

export default config
