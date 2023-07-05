import { MigrationInterface, QueryRunner } from "typeorm";

export class NotesAdded1688521945108 implements MigrationInterface {
    name = 'NotesAdded1688521945108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospect" ADD "notes" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospect" DROP COLUMN "notes"`);
    }

}
