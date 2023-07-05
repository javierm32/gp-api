import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1688517682052 implements MigrationInterface {
    name = 'NewMigration1688517682052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospect" ADD "number" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "prospect" ADD "neighborhood" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "prospect" ADD "city" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "prospect" ADD "state" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospect" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "prospect" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "prospect" DROP COLUMN "neighborhood"`);
        await queryRunner.query(`ALTER TABLE "prospect" DROP COLUMN "number"`);
    }

}
