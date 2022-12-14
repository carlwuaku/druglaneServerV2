
import { Table, Model, Column, DataType, ForeignKey, CreatedAt, Index } from "sequelize-typescript";
import { Customers } from "./Customers";
import { Products } from "./products";
import { Users } from "./Users";


@Table({
  tableName: 'refills',
  modelName: 'Refills'
})

export class Refills extends Model{
  @Index
  @Column
  product: string;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
    product_id: number;

   @Column({
     type: DataType.DOUBLE,
     defaultValue: 1
    
   }) 
    quantity: number;

    @Index
    @Column({
      type: DataType.DATE,
      allowNull: false
    })
    start_date: string;

    @Index
    @Column({
      type: DataType.DATE,
    })
    end_date: string;

    @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  created_by: number;

    @Index
    @Column
    status: string;

    @ForeignKey(() => Customers)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    customer_id: number;

    @Column
    customer_name: string;

    @CreatedAt
    created_on: string;
    
}
