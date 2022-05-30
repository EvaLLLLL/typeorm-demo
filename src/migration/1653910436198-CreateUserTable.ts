import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTable1653910436198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'age', type: 'int', isNullable: true },
          { name: 'blog_ids', type: 'integer[]', isNullable: true },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('users')
  }
}
