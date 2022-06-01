import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBlogsTable1653910895101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'blogs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'content', type: 'text' },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('blogs')
  }
}
