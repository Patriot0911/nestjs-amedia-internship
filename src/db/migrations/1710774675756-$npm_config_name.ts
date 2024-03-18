import { MigrationInterface, QueryRunner } from 'typeorm'

export class $npmConfigName1710774675756 implements MigrationInterface {
  name = ' $npmConfigName1710774675756'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "newsContent" ("id" SERIAL NOT NULL, "lang" character varying NOT NULL, "title" character varying NOT NULL, "shortDescription" character varying NOT NULL, "newsPostId" uuid, CONSTRAINT "PK_0b5eaa993309cc8002327462e02" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "newsContent" ADD CONSTRAINT "FK_09b416b1727778b6cfccae71e66" FOREIGN KEY ("newsPostId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "newsContent" DROP CONSTRAINT "FK_09b416b1727778b6cfccae71e66"`)
    await queryRunner.query(`DROP TABLE "newsContent"`)
  }
}
