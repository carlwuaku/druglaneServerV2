import { Table, Model, Column, DataType, ForeignKey, CreatedAt } from "sequelize-typescript";

@Table({
   tableName: 'online_backups',
  modelName: 'OnlineBackups',
  paranoid: true,
})
export class OnlineBackups extends Model{
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  date:string;

  @Column
  url:string;


  @CreatedAt
  created_on:string;
}
