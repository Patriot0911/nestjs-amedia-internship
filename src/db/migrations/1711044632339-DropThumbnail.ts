import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711044632339 implements MigrationInterface {
  name = ' $npmConfigName1711044632339'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "thumbnailUrl"`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" ADD "thumbnailUrl" character varying`)
  }
}
