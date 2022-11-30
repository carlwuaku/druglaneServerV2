import { Table, Model, Column, DataType, ModelClassGetter,
   CreatedAt, PrimaryKey, HasMany, BelongsToMany } from "sequelize-typescript";
import { Permissions } from "./permissions";
import { RolePermissions } from "./RolePermissions";

@Table({
   tableName: 'roles',
   modelName: 'Roles'
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

  // @HasMany(() => Permissions)
  // permissions: Permissions
}
