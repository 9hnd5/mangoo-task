import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTask1671639823947 implements MigrationInterface {
    name = 'updateTask1671639823947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`projectSectionId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`projectSectionId\``);
    }

}
