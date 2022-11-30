import { Table, Model, Column, CreatedAt, Index } from "sequelize-typescript";

@Table({
   tableName: 'diagnostic_tests',
   modelName: 'DiagnosticTests'
})

export class DiagnosticTests extends Model{
  @Index
  @Column
  test_name: string;

  @Column
    parameters: string;

    @Column
    comments: string;

    @CreatedAt
    created_on: string
}
