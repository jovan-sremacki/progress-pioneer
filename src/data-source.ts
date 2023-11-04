import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from './modules/authentication/domain/entities/User'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "progress_pioneer",
    password: "123",
    database: "progress_pioneer",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
