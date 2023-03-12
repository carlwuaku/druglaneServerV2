import { Table, Model, Column, DataType, ForeignKey, Index, CreatedAt, BelongsTo, PrimaryKey } from "sequelize-typescript";
import { Products } from "./Products";
import { Purchases } from "./Purchases";
import { Sales } from "./Sales";
import { Users } from "./Users";

@Table({
  tableName: "sales_details",
  modelName: 'SalesDetails',
  paranoid: true,
})
 export class SalesDetails extends Model{
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true
  })
  id: number
  
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

  @Column
  label: string;
  
  @Index
  @ForeignKey(()=> Sales)
  @Column
  code: string;

  @Index
  @Column
  date: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  cost_price: number;

  @Index
  @Column
  expiry: string;
 }



