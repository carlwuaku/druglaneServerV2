import { Table, Model, Column, DataType, ForeignKey, Index, CreatedAt, HasMany, PrimaryKey } from "sequelize-typescript";
import { PurchaseDetails } from "./PurchaseDetails";
import { Users } from "./Users";
import { Vendors } from "./Vendors";

@Table({
   tableName: 'purchases',
  modelName: 'Purchases',
  paranoid: true,
})

export class Purchases extends Model{

  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true
  })
  id: number

  
  @ForeignKey(() => Vendors)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  vendor: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  date: string;

  @Column
  site: string;

  @Index
  @Column
  code: string;

  @Column
  status: string;

  @CreatedAt
  created_on: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  
  created_by: number;

  @Index
  @Column
  invoice: string;

  @Index
  @Column
  payment_method: string;

  @Column({
    type: DataType.DOUBLE
  })
  amount_paid: number;

  @Column({
    type: DataType.DATE,
  })
  last_payment_date: string

  @HasMany(()=> PurchaseDetails, 'code')
  details: PurchaseDetails[]
}



