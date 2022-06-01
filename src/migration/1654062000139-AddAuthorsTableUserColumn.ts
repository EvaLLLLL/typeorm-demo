import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddAuthorsTableUserColumn1654062000139
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.addColumns('authors', [
      new TableColumn({
        name: 'user_id',
        type: 'int',
        isNullable: true,
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropColumn('authors', 'user_id')
  }
}
