import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711023901828 implements MigrationInterface {
  name = ' $npmConfigName1711023901828'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsCategory" ADD "isPublished" boolean DEFAULT false`)
    await queryRunner.query(`ALTER TABLE "newsCategory" ADD "publishedAt" date`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsCategory" DROP COLUMN "publishedAt"`)
    await queryRunner.query(`ALTER TABLE "newsCategory" DROP COLUMN "isPublished"`)
  }
}
