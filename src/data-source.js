const { DataSource } = require("typeorm");
const path = require("path");

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "progress_pioneer",
    password: "123",
    database: "progress_pioneer",
    synchronize: false,
    logging: false,
    entities: [
        path.join(__dirname, '../dist/modules/**/domain/entities/*.js')
    ],
    migrations: [
        path.join(__dirname, '../dist/migrations/*.js')
    ],
    subscribers: [
        path.join(__dirname, '../dist/modules/**/infrastructure/subscribers/*.js')
    ],
});

module.exports = {
    AppDataSource
};
