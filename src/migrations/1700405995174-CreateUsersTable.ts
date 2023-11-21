import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersTable1699993952289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "user_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED');
            CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'MANAGER', 'MEMBER');
            CREATE TABLE "users" (
                "id" INTEGER PRIMARY KEY,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "username" character varying,
                "password" character varying NOT NULL,
                "email" character varying NOT NULL UNIQUE,
                "status" "user_status_enum" NOT NULL DEFAULT 'INACTIVE',
                "role" "user_role_enum" NOT NULL DEFAULT 'MEMBER',
                "verified" boolean NOT NULL,
                "timezone" character varying,
                "language_preference" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            )
        `)  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TYPE "user_status_enum"`);
    }

}
