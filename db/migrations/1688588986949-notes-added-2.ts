import { MigrationInterface, QueryRunner } from "typeorm";

export class NotesAdded21688588986949 implements MigrationInterface {
    name = 'NotesAdded21688588986949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospect" ADD "documentRef" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospect" DROP COLUMN "documentRef"`);
    }

}
