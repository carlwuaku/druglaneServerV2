import { Table, Model, Column, DataType, ForeignKey, Index, CreatedAt } from "sequelize-typescript";
import { Customers } from "./Customers";
import { Users } from "./Users";

@Table({
  tableName: "sales",
  modelName: 'Sales'
})

export class Sales extends Model{
  @ForeignKey(()=> Customers)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null
  })
  customer: number;

  @Index
  @Column({
    allowNull: false,
  })
  code: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  created_by: number

  @CreatedAt
  created_on: string;

  @Column({
    type: DataType.DOUBLE,
    defaultValue: 0
  })
  amount_paid: number;

  @Index
  @Column
  payment_method: string;

  @Index
  @Column
  momo_reference: string;

  @Index
  @Column
  insurance_provider: string;

  @Index
  @Column
  insurance_member_name: string;

  @Index
  @Column
  insurance_member_id: string;

  @Index
  @Column
  creditor_name: string;

  
  @Column({
    type: DataType.DOUBLE
  })
  credit_paid: number;

  @Column({
    type: DataType.DOUBLE
  })
  discount:  number;

  @Index
  @Column
  shift: string;
}
