import { MigrationInterface, QueryRunner } from "typeorm";

export class updateDB1671864357039 implements MigrationInterface {
    name = 'updateDB1671864357039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`createdBy\` \`createdById\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`createdById\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`createdById\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`createdById\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`createdById\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`createdById\` \`createdBy\` varchar(255) NOT NULL`);
    }

}
