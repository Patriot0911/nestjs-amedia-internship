import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711285096873 implements MigrationInterface {
  name = ' $npmConfigName1711285096873'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appeal" DROP COLUMN "ipn"`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD "ipn" bigint NOT NULL`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appeal" DROP COLUMN "ipn"`)
    await queryRunner.query(`ALTER TABLE "appeal" ADD "ipn" integer NOT NULL`)
  }
}
