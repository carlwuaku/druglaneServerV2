import { Column, CreatedAt, DataType, Index, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "stock_values",
  modelName: 'StockValues',
  paranoid: true,
})

export class StockValues extends Model{
  @Index
  @Column({
    type: DataType.DATE
  })
  date: string;

  @Column({
    type: DataType.DATE
  })
  last_modified: string;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  selling_value:number;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  cost_value:number;

  @CreatedAt
  created_on:string;
  
}
