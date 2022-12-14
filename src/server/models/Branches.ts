import { Table, Model, Column, DataType, PrimaryKey, CreatedAt, Index } from "sequelize-typescript";

@Table({
   tableName: 'branches',
   modelName: 'Branches'
})

export class Branches extends Model{
  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  location: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email: string;

  @CreatedAt
  created_on: string

}