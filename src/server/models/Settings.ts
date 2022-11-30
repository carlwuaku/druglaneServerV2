import { Table, Model, Column, Index } from "sequelize-typescript";

@Table({
  tableName: "settings",
  modelName: 'Settings'
})
export class Settings extends Model{
  @Index
  @Column({
    allowNull : false,
    unique: true
  })
  name:string;

  @Column
  value:string;

  @Column({
    allowNull: false
    
  })
  module:string


}


