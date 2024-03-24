import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1711279318520 implements MigrationInterface {
  name = ' $npmConfigName1711279318520'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appeal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "finishedAt" date NOT NULL, "type" character varying NOT NULL, "ipn" integer NOT NULL, "age" integer NOT NULL, CONSTRAINT "UQ_d06542789155a67669d85ae55fd" UNIQUE ("email"), CONSTRAINT "PK_f644a99d2dfcff9facb08bd1697" PRIMARY KEY ("id"))`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "appeal"`)
  }
}
