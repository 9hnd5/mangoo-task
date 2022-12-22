import { MigrationInterface, QueryRunner } from "typeorm";

export class createSection1670811640808 implements MigrationInterface {
    name = 'createSection1670811640808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_73620fc3cdc308ec576f8ee55ff\` ON \`task\``);
        await queryRunner.query(`CREATE TABLE \`section\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`sectionId\` \`sectionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_a5cef86fa95ccc1af789c26c614\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_a5cef86fa95ccc1af789c26c614\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`sectionId\` \`sectionId\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`section\``);
        await queryRunner.query(`CREATE INDEX \`FK_73620fc3cdc308ec576f8ee55ff\` ON \`task\` (\`sectionId\`)`);
    }

}
