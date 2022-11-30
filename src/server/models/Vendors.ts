import { Table, Model, Column, CreatedAt, Index } from "sequelize-typescript";

@Table({
   tableName: 'vendors',
   modelName: 'Vendors'
})

export class Vendors extends Model{
  @Index
  @Column
  name: string;

  @Column
  location: string;

  @Index
  @Column
  phone: string;

  @Index
  @Column
  code: string;

  @Index
  @Column
  email: string;

 
  @Column
  notes: string;

  @CreatedAt
  created_on: string;
  @Column
  legacy_id: string
}




