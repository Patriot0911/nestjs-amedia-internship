import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711030743862 implements MigrationInterface {
  name = ' $npmConfigName1711030743862'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsContent" ADD "thumbnailUrl" character varying`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsContent" DROP COLUMN "thumbnailUrl"`)
  }
}
