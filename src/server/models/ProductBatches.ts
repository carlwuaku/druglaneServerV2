import { Table, Model, Column, DataType, ForeignKey, CreatedAt, Index } from "sequelize-typescript";
import { Products } from "./Products";
import { Users } from "./Users";


@Table({
  tableName: 'outgoing_payments',
  modelName: 'ProductBatches',
  paranoid: true,
})
export class ProductBatches extends Model{
  @Column
  batch_number: string;

  @Column({
    type: DataType.DATE
  })
  expiry: string;
  @Column
  barcode: string;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER
  })
  product: number

  @Column
  purchase_code: string

}
