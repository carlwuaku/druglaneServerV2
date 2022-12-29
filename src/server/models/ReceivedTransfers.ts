
import { Table, Model, Column, DataType, ForeignKey, CreatedAt, Index } from "sequelize-typescript";
import { Branches } from "./Branches";
import { Users } from "./Users";


@Table({
  tableName: 'received_transfers',
  modelName: 'ReceivedTransfers',
  paranoid: true,
})

export class ReceivedTransfers extends Model{
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  date: string;

  @Index
  @Column({
    allowNull: false
  })
  code: string;
  
  @Index
  @Column({
    allowNull: false
  })
  invoice: string;

  @CreatedAt
  created_on: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  created_by: number;

  @ForeignKey(() => Branches)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  sender: number
}

