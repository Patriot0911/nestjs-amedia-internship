import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1711029732208 implements MigrationInterface {
    name = ' $npmConfigName1711029732208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "newsPostContentData" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "htmlText" character varying NOT NULL, "bgImgSrc" character varying NOT NULL, "translationContentId" integer, CONSTRAINT "PK_bbe58b67d4a310ac786c2dfbf23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news" ADD "thumbnailUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "news" ADD "slug" character varying`);
        await queryRunner.query(`ALTER TABLE "newsPostContentData" ADD CONSTRAINT "FK_1a11df8e9621fcf33bdd24deca1" FOREIGN KEY ("translationContentId") REFERENCES "newsContent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsPostContentData" DROP CONSTRAINT "FK_1a11df8e9621fcf33bdd24deca1"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "thumbnailUrl"`);
        await queryRunner.query(`DROP TABLE "newsPostContentData"`);
    }

}
