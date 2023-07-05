import { MigrationInterface, QueryRunner } from "typeorm";

export class ProspectStatusAdded1688453957785 implements MigrationInterface {
    name = 'ProspectStatusAdded1688453957785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospect" RENAME COLUMN "model" TO "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospect" RENAME COLUMN "status" TO "model"`);
    }

}
