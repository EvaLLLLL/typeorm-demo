import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCommentsTable1653911213431 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'content', type: 'text' },
          { name: 'userId', type: 'int' },
          { name: 'blogId', type: 'int' },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('comments')
  }
}
