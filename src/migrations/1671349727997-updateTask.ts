import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTask1671349727997 implements MigrationInterface {
    name = 'updateTask1671349727997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`assigneeName\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`projectName\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`projectName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`assigneeName\` varchar(255) NULL`);
    }

}
