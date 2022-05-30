import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAutorsTable1653911368569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'authors',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'blog_ids', type: 'integer[]' },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
