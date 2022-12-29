import { Table, Model, Column, DataType,  CreatedAt, Index, ForeignKey } from "sequelize-typescript";
import { Users } from "./Users";

@Table({
   tableName: 'incoming_payments',
  modelName: 'IncomingPayments',
  paranoid: true,
})

export class IncomingPayments extends Model{
  @Index
  @Column({
    type: DataType.DATE
  })
  date: string;

  @Column({
    type: DataType.DOUBLE
  })
    amount: number;

    @Index
    @Column
    type: string;

    @Index
    @Column
    payer: string;

    @Index
    @Column
    payment_method: string;

    @Index
    @Column
    transaction_id: string;
    @Column
    item_code: string;


    @Column
    notes: string;
    
    @ForeignKey(() => Users)
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    created_by: number;

    @Index
    @CreatedAt
    created_on: string
}
