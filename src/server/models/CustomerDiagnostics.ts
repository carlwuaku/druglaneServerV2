import { Table, Model, Column, DataType,  CreatedAt, ForeignKey, Index } from "sequelize-typescript";
import { Customers } from "./Customers";

@Table({
   tableName: 'customer_diagnostics',
  modelName: 'CustomerDiagnostics',
  paranoid: true,

})

export class CustomerDiagnostics extends Model{
  
  @ForeignKey(()=> Customers)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer:number

  @Column
  test:string

  @Column
  data:string

  @Column
  comments:string

  @Index
  @Column
  date:string

  @Index
  @CreatedAt
  created_on:string


}
