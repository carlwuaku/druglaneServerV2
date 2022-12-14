
import { Table, Model, Column, DataType, ForeignKey, CreatedAt, Index, BelongsTo } from "sequelize-typescript";
import { Products } from "./products";
import { ReceivedTransfers } from "./ReceivedTransfers";
import { Users } from "./Users";


@Table({
  tableName: 'received_transfer_details',
  modelName: 'ReceivedTransferDetails'
})

export class ReceivedTransferDetails extends Model{
  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  product: number;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  quantity: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  price: number;

  @Column
  unit: string;

  @CreatedAt
  created_on: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  created_by: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  markup: number;

  @Index
  @ForeignKey(()=> ReceivedTransfers)
  @Column
  code: string;

  @Index
  @Column
  date: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  selling_price: number;

  // @BelongsTo(() => ReceivedTransfers, 'code')
}
