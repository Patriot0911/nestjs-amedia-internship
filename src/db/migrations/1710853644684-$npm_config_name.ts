import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1710853644684 implements MigrationInterface {
    name = ' $npmConfigName1710853644684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "newsCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7891f21748c026d1ba5802460e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsCatContent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lang" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "PK_050fd2d3bbfbf6f38274a8e4f0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_news_categories_news_category" ("newsId" uuid NOT NULL, "newsCategoryId" uuid NOT NULL, CONSTRAINT "PK_76c6541c20c47d5a754ec8af548" PRIMARY KEY ("newsId", "newsCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c7ea38c41702194df5a0f9e856" ON "news_news_categories_news_category" ("newsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab52af8cd6977095deb7b2f3a0" ON "news_news_categories_news_category" ("newsCategoryId") `);
        await queryRunner.query(`ALTER TABLE "newsCatContent" ADD CONSTRAINT "FK_f99eadf0b4e90ca9069b0bd27cf" FOREIGN KEY ("categoryId") REFERENCES "newsCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_news_categories_news_category" ADD CONSTRAINT "FK_c7ea38c41702194df5a0f9e856d" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "news_news_categories_news_category" ADD CONSTRAINT "FK_ab52af8cd6977095deb7b2f3a04" FOREIGN KEY ("newsCategoryId") REFERENCES "newsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_news_categories_news_category" DROP CONSTRAINT "FK_ab52af8cd6977095deb7b2f3a04"`);
        await queryRunner.query(`ALTER TABLE "news_news_categories_news_category" DROP CONSTRAINT "FK_c7ea38c41702194df5a0f9e856d"`);
        await queryRunner.query(`ALTER TABLE "newsCatContent" DROP CONSTRAINT "FK_f99eadf0b4e90ca9069b0bd27cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab52af8cd6977095deb7b2f3a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c7ea38c41702194df5a0f9e856"`);
        await queryRunner.query(`DROP TABLE "news_news_categories_news_category"`);
        await queryRunner.query(`DROP TABLE "newsCatContent"`);
        await queryRunner.query(`DROP TABLE "newsCategory"`);
    }

}
