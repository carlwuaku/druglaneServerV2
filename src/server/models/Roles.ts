import { Table, Model, Column, DataType, ModelClassGetter,
   CreatedAt, PrimaryKey, HasMany, BelongsToMany } from "sequelize-typescript";
import { Permissions } from "./Permissions";
import { RolePermissions } from "./RolePermissions";

@Table({
   tableName: 'roles',
  modelName: 'Roles',
  paranoid: true,
})
// @BelongsToMany(Permissions, RolePermissions)

export class Roles extends Model{
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  role_id: number;

  @Column
  role_name: string;
  @Column
  description: string

  @CreatedAt
  created_on: string

  updatedAt: false

  // @HasMany(() => Permissions)
  // permissions: Permissions
}
