import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTask1671370332367 implements MigrationInterface {
    name = 'updateTask1671370332367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`startEnd\` \`endDate\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`endDate\` \`startEnd\` datetime NULL`);
    }

}
