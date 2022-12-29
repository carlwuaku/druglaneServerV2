import { Table, Model, Column, DataType, ForeignKey, Index, CreatedAt, BelongsTo } from "sequelize-typescript";
import { Products } from "./Products";
import { Purchases } from "./Purchases";
import { Users } from "./Users";

@Table({
  tableName: "stock_adjustment_pending",
  modelName: 'StockAdjustmentPending',
  paranoid: true,
})

export class StockAdjustmentPending extends Model{
  @Index
  @Column({
    type: DataType.DATE
  })
  date: string;

  
  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  product: number;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  quantity_counted: number;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  quantity_expected: number;

  
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  current_price: number;

  @ForeignKey(()=> Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  created_by: number;

  @Column
  code: string;

  @CreatedAt
  created_on: string;


  @Column
  category: string;

  @Column
  size: string;

  @Column({
    type: DataType.DATE
  })
  expiry: string;

  @Column
  comments: string;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  quantity_expired: number;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  quantity_damaged: number;

  @Column
  shelf: string;

  @Column
  unit:string
}
