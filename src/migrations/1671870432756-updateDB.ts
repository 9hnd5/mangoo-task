import { MigrationInterface, QueryRunner } from "typeorm";

export class updateDB1671870432756 implements MigrationInterface {
    name = 'updateDB1671870432756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_8c9920b5fb32c3d8453f64b705c\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_8c9920b5fb32c3d8453f64b705c\` FOREIGN KEY (\`parentId\`) REFERENCES \`task\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_8c9920b5fb32c3d8453f64b705c\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_8c9920b5fb32c3d8453f64b705c\` FOREIGN KEY (\`parentId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
