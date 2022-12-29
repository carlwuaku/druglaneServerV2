
import { Table, Model, Column, DataType,  CreatedAt, HasMany, ForeignKey } from "sequelize-typescript";
import { Users } from "./Users";

@Table({
   tableName: 'dbbackups',
  modelName: 'DbBackups',
  paranoid: true,
})

export class DbBackups extends Model{
  @Column
  file_name: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER
  })
  created_by: string;
  @Column
  description: string;
  @Column
  uploaded: string;
  @Column
  db_version: string;
  @CreatedAt
  created_on: string
}
