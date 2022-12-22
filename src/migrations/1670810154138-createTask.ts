import { MigrationInterface, QueryRunner } from "typeorm";

export class createTask1670810154138 implements MigrationInterface {
    name = 'createTask1670810154138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`assigneeId\` int NULL, \`assigneeName\` varchar(255) NULL, \`startDate\` datetime NULL, \`startEnd\` datetime NULL, \`projectId\` int NULL, \`projectName\` varchar(255) NULL, \`sectionId\` int NOT NULL, \`priority\` enum ('Low', 'Medium', 'High') NULL, \`progress\` enum ('NotStarted', 'InProgress', 'Waiting', 'Defered', 'Done') NULL, \`description\` varchar(255) NULL, \`isPublic\` tinyint NOT NULL DEFAULT 0, \`isComplete\` tinyint NOT NULL DEFAULT 0, \`order\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
