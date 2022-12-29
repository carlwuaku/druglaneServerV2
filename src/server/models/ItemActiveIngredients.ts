import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Products } from "./Products";

@Table({
   tableName: 'item_active_ingredients',
  modelName: 'ItemActiveIngredients',
  paranoid: true,
   
})
export class ItemActiveIngredients extends Model{
  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  product:number;

  @Column
  ingredient:string;
}
