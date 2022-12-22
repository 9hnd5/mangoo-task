import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTask1671351917608 implements MigrationInterface {
    name = 'updateTask1671351917608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`assigneeId\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`assigneeId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`assigneeId\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`assigneeId\` int NULL`);
    }

}
