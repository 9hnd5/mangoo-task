import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTask1671384404158 implements MigrationInterface {
    name = 'updateTask1671384404158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description\` varchar(2000) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description\` varchar(255) NULL`);
    }

}
