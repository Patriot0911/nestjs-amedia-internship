import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1710854109510 implements MigrationInterface {
    name = ' $npmConfigName1710854109510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsCategory" ADD "defaultName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsCategory" DROP COLUMN "defaultName"`);
    }

}
