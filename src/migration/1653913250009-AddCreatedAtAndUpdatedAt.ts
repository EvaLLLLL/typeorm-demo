import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCreatedAtAndUpdatedAt1653913250009
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.addColumns('blogs', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('blogs', 'created_at')
    return await queryRunner.dropColumn('blogs', 'updated_at')
  }
}
