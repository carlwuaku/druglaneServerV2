import { Column, CreatedAt, DataType, ForeignKey, Index, Model, Table } from "sequelize-typescript";
import { Users } from "./Users";


@Table({
  tableName: "stock_adjustment_sessions",
  modelName: 'StockAdjustmentSessions'
})

export class StockAdjustmentSessions extends Model{
  @Index
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  date:string;

  @Index
  @Column
  code:string;

  @CreatedAt
  created_on:string;

  @ForeignKey(()=> Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  created_by: number;


}
