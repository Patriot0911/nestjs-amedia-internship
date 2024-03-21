import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711051572354 implements MigrationInterface {
  name = ' $npmConfigName1711051572354'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsContent" ADD "contentdata" character varying`)
    await queryRunner.query(`ALTER TABLE "newsContent" ADD "metaData" character varying`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsContent" DROP COLUMN "metaData"`)
    await queryRunner.query(`ALTER TABLE "newsContent" DROP COLUMN "contentdata"`)
  }
}
