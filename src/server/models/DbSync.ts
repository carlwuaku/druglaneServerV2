import { Table, Model, Column,   CreatedAt } from "sequelize-typescript";

@Table({
   tableName: 'db_sync',
  modelName: 'DbSync',
  paranoid: true,
})

export class DbSync extends Model{
  @Column
  type: string;

  @Column
  action: string;

  @Column
  data: string;

  @CreatedAt
  created_on: string
}

