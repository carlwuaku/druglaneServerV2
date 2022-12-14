import { Table, Model, Column, DataType, ForeignKey, Index, CreatedAt, BelongsTo } from "sequelize-typescript";
import { Products } from "./products";
import { Purchases } from "./purchases";
import { Users } from "./Users";

@Table({
   tableName: 'purchases',
   modelName: 'PurchaseDetails'
})

export class PurchaseDetails extends Model{
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
  @ForeignKey(()=> Purchases)
  @Column
  code: string;

  @Index
  @Column({
    type: DataType.DATE
  })
  date: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  selling_price: number;
  
  @Column({
    type: DataType.DATE
  })
  expiry:string;
}
