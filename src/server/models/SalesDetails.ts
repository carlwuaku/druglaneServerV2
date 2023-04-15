import { sequelize } from "../config/sequelize-config";
import { Table, Model, Column, DataType, ForeignKey, Index, CreatedAt, PrimaryKey } from "sequelize-typescript";
import { Products } from "./Products";
import { Sales } from "./Sales";
import { Op } from "sequelize";

@Table({
  tableName: "sales_details",
  modelName: 'SalesDetails',
  paranoid: true,
})
 export class SalesDetails extends Model{
  static async getTotalSales(start: string, end: string):Promise<number> {
    let object = await this.findOne({
      attributes: [
        [sequelize.literal(`sum(price * quantity)`),'total_amount'],
        [sequelize.fn("SUM", sequelize.col('amount')), 'total']
      ],
      where: {
        date: { [Op.between]: [new Date(start), new Date(end)] },
        
      }
    });
    return object.total_amount || 0
  }
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

  total_amount?: number;
  num_of_items?: number;
  display_name?: string;
 }



