import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTask1670832905900 implements MigrationInterface {
    name = 'updateTask1670832905900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_a5cef86fa95ccc1af789c26c614\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`sectionId\` \`sectionId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_a5cef86fa95ccc1af789c26c614\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_a5cef86fa95ccc1af789c26c614\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`sectionId\` \`sectionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_a5cef86fa95ccc1af789c26c614\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
