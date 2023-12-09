import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.string('username')
    table.string('password').notNullable()
    table.string('email').notNullable().unique()
    table.enu('status', ['ACTIVE', 'INACTIVE', 'SUSPENDED']).notNullable().defaultTo('INACTIVE')
    table.enu('role', ['ADMIN', 'MANAGER', 'MEMBER']).notNullable().defaultTo('MEMBER')
    table.boolean('verified').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
