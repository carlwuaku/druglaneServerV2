import { Column, CreatedAt, DataType, ForeignKey, Index, Model, Table } from "sequelize-typescript";
import { Branches } from "./Branches";
import { Users } from "./Users";

@Table({
  tableName:"transfers",
  modelName: 'Transfers',
  paranoid: true,
})

export class Transfers extends Model{
  @ForeignKey(() => Branches)
  @Column({
    type: DataType.INTEGER
  })
  receiver: number;

  @Index
  @Column({
    type: DataType.DATE
  })
  date: string;

  @Index
  @Column
  code: string;

  @Column
  status: string;

  @CreatedAt
  created_on:string;

  @ForeignKey(()=> Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  created_by: number;
}

