import { sequelize } from "../config/sequelize-config";
import { Table, Model, Column, DataType,  CreatedAt, Index, ForeignKey, PrimaryKey } from "sequelize-typescript";
import { Op } from "sequelize";
import { Users } from "./Users";

@Table({
   tableName: 'incoming_payments',
  modelName: 'IncomingPayments',
  paranoid: true,
})

export class IncomingPayments extends Model{
    static async getTotalPaid(payer?: string, start?: string, end?: string):Promise<number> {
      let object = await this.findOne({
        attributes: [
          [sequelize.fn("SUM", sequelize.col('amount')), 'total']
        ],
        where: {
          type: 'Credit Sale Payment',
          ...(start && { date: { [Op.gte]: new Date(start) } }),
          ...(end && { date: { [Op.lte]: new Date(end) } }),
          ...(payer && { payer: payer })
        }
      });
      return object.total || 0
    }
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true
  })
  id: number
  
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
  created_on: string;

  total?: number;
}
