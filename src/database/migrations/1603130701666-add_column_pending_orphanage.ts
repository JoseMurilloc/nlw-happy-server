import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnPendingOrphanage1603130701666 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('orphanages', new TableColumn({
      name: 'pending',
      type: 'boolean',
      default: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'pending');
  }

}
