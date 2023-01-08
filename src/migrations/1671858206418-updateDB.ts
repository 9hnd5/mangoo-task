import { MigrationInterface, QueryRunner } from "typeorm";

export class updateDB1671858206418 implements MigrationInterface {
    name = 'updateDB1671858206418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`createdBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_8c9920b5fb32c3d8453f64b705c\` FOREIGN KEY (\`parentId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_8c9920b5fb32c3d8453f64b705c\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`parentId\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`updatedDate\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`createdDate\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`createdBy\``);
    }

}
