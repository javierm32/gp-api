import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1688452832522 implements MigrationInterface {
    name = 'Init1688452832522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prospect" ("id" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "street" character varying(255) NOT NULL, "zipcode" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "rfc" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_e2da68126884e562b84d74d7d09" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "prospect"`);
    }

}
