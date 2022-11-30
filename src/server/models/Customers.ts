import { Table, Model, Column, DataType,  CreatedAt, HasMany, Index } from "sequelize-typescript";
import { CustomerDiagnostics } from "./CustomerDiagnostics";

@Table({
   tableName: 'customers',
   modelName: 'Customers'

})

export class Customers extends Model{
  @Index
  @Column
  name:string;

  
  @Column
  sex:string;

  @Index
  @Column
  phone:string;

  @Index
  @Column
  email:string;

  @Column
  date_of_birth:string;

  @CreatedAt
  created_on:string;

  @Column
  location:string;

  @HasMany(()=> CustomerDiagnostics)
  customerDiagnostics: CustomerDiagnostics[]
}
