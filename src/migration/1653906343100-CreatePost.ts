import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePost1653906343100 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                { name: 'id', type: 'int', isGenerated: true, generationStrategy: 'increment', isPrimary: true },
                { name: 'title', type: 'varchar' },
                { name: 'content', type: 'text' }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropTable('posts')
    }
}
