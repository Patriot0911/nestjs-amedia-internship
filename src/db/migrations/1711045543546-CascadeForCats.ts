import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711045543546 implements MigrationInterface {
  name = ' $npmConfigName1711045543546'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_6573fe000551c966d07f27513c0"`)
    await queryRunner.query(`ALTER TABLE "newsCatContent" DROP CONSTRAINT "FK_f99eadf0b4e90ca9069b0bd27cf"`)
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_6573fe000551c966d07f27513c0" FOREIGN KEY ("newsCategoryId") REFERENCES "newsCategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "newsCatContent" ADD CONSTRAINT "FK_f99eadf0b4e90ca9069b0bd27cf" FOREIGN KEY ("categoryId") REFERENCES "newsCategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsCatContent" DROP CONSTRAINT "FK_f99eadf0b4e90ca9069b0bd27cf"`)
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_6573fe000551c966d07f27513c0"`)
    await queryRunner.query(
      `ALTER TABLE "newsCatContent" ADD CONSTRAINT "FK_f99eadf0b4e90ca9069b0bd27cf" FOREIGN KEY ("categoryId") REFERENCES "newsCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_6573fe000551c966d07f27513c0" FOREIGN KEY ("newsCategoryId") REFERENCES "newsCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
