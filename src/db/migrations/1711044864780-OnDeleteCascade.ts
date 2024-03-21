import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1711044864780 implements MigrationInterface {
    name = ' $npmConfigName1711044864780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsPostContentData" DROP CONSTRAINT "FK_1a11df8e9621fcf33bdd24deca1"`);
        await queryRunner.query(`ALTER TABLE "newsContent" DROP CONSTRAINT "FK_09b416b1727778b6cfccae71e66"`);
        await queryRunner.query(`ALTER TABLE "newsPostContentData" ADD CONSTRAINT "FK_1a11df8e9621fcf33bdd24deca1" FOREIGN KEY ("translationContentId") REFERENCES "newsContent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsContent" ADD CONSTRAINT "FK_09b416b1727778b6cfccae71e66" FOREIGN KEY ("newsPostId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newsContent" DROP CONSTRAINT "FK_09b416b1727778b6cfccae71e66"`);
        await queryRunner.query(`ALTER TABLE "newsPostContentData" DROP CONSTRAINT "FK_1a11df8e9621fcf33bdd24deca1"`);
        await queryRunner.query(`ALTER TABLE "newsContent" ADD CONSTRAINT "FK_09b416b1727778b6cfccae71e66" FOREIGN KEY ("newsPostId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsPostContentData" ADD CONSTRAINT "FK_1a11df8e9621fcf33bdd24deca1" FOREIGN KEY ("translationContentId") REFERENCES "newsContent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
