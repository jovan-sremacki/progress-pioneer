import knex, { Knex } from 'knex';
import knexfile from '../../knexfile';

let db: Knex;

export const setupTestDB = (): Knex => {
  db = knex(knexfile.test);
  return db;
};

export const teardownTestDB = async (tableToClear: string): Promise<void> => {
  await db(tableToClear).del();
  await db.destroy();
};
