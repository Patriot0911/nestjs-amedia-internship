import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711052323459 implements MigrationInterface {
  name = ' $npmConfigName1711052323459'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsContent" RENAME COLUMN "contentdata" TO "contentData"`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsContent" RENAME COLUMN "contentData" TO "contentdata"`)
  }
}
