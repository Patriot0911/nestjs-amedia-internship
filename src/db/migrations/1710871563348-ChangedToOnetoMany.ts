import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1710871563348 implements MigrationInterface {
  name = ' $npmConfigName1710871563348'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" ADD "newsCategoryId" uuid`)
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_6573fe000551c966d07f27513c0" FOREIGN KEY ("newsCategoryId") REFERENCES "newsCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_6573fe000551c966d07f27513c0"`)
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "newsCategoryId"`)
  }
}
