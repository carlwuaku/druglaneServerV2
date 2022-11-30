import { Column, CreatedAt, DataType, ForeignKey, Index, Model, Table } from "sequelize-typescript";
import { Products } from "./products";
import { Users } from "./Users";

@Table({
  tableName: "stock_adjustment",
  modelName: 'StockAdjustment'
})

export class StockAdjustment extends Model{
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


