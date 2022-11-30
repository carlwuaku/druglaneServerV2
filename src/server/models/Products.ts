import { Table, Model, Column, DataType, ForeignKey, Index, CreatedAt } from "sequelize-typescript";

@Table({
   tableName: 'products',
   modelName: 'Products'
})

export class Products extends Model{
  @Index
  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  price: number;

  @Index
  @Column
  category: string;

  @Column
  notes: string;

  @Column
  unit: string;

  @Column
  picture: string;

  @Index
  @CreatedAt
  created_on: string;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  max_stock: number;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  min_stock: number;

  @Index
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  expiry: string;

  @Column
  barcode: string;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  current_stock: number;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  last_modified: string;

  @Index
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  cost_price: number;

  @Column
  size: string;

  @Index
  @Column
  description: string;
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 1
  })
  status: number;

  @Column
  shelf: string

  @Column({
    type: DataType.INTEGER
  })
  preferred_vendor:number;

  @Column
  is_drug:string;

  @Column
  generic_name:string;

  @Column
  contraindications:string;

  @Column
  pregnancy:string;

  @Column
  side_effects:string;

  @Column
  caution:string;

  @Column
  indications:string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 1.33
  })
  markup:number;

  @Column
  active_ingredients:string;

  @Column
  drug_info:string;
}

