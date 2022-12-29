import { Table, Model, Column, DataType,  CreatedAt, PrimaryKey, ForeignKey,
   Index, HasMany, BelongsToMany } from "sequelize-typescript";
import { RolePermissions } from "./RolePermissions";
import { Roles } from "./Roles";

@Table({
   tableName: 'permissions',
  modelName: 'Permissions',
  paranoid: true,
})


export class Permissions extends Model{
  @PrimaryKey
  @Column
  permission_id:number;

  @Index
  @Column({
    unique: true,
  })
  name:string;

  @Index
  @Column
  description:string;

  // @HasMany(() => Roles)
  // roles:Roles

 
}
// Permissions.belongsToMany(Roles, {through: RolePermissions})