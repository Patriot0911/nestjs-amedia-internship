import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1710855962791 implements MigrationInterface {
    name = ' $npmConfigName1710855962791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsCatContent" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsCatContent" DROP COLUMN "name"`);
    }

}
