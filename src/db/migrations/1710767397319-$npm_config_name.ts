import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1710767397319 implements MigrationInterface {
    name = ' $npmConfigName1710767397319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "shortDescription" character varying NOT NULL, "publishedAt" date, "isPublished" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appeal" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appeal" DROP COLUMN "test"`);
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
