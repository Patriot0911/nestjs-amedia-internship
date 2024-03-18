import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1710774352233 implements MigrationInterface {
    name = ' $npmConfigName1710774352233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "newsInfo" ("id" SERIAL NOT NULL, "lang" character varying NOT NULL, "title" character varying NOT NULL, "shortDescription" character varying NOT NULL, "newsPostId" uuid, CONSTRAINT "PK_3834740a4719774fda43a3dd473" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "shortDescription"`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "isPublished" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "newsInfo" ADD CONSTRAINT "FK_2a2bc29f256b84568bb411ad5c4" FOREIGN KEY ("newsPostId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsInfo" DROP CONSTRAINT "FK_2a2bc29f256b84568bb411ad5c4"`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "isPublished" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "news" ADD "shortDescription" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "newsInfo"`);
    }

}
