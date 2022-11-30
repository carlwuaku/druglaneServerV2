import { Table, Model, Column, DataType,  CreatedAt, ForeignKey, Index, BelongsTo } from "sequelize-typescript";
import { Roles } from "./roles";

@Table({
   tableName: 'users',
   modelName: 'Users'
})


export class Users extends Model{
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER
  })
  role_id: number

  @Index
  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
    email: string;

    @Index
    @Column({
      allowNull: false,
      type: DataType.STRING,
      unique: true
    })
    username: string;

    @Index
    @Column({
      allowNull: false,
      type: DataType.TEXT,
    })
    password_hash: string;

    @Column({
      allowNull: true,
      type: DataType.DATE,
    })
    last_login: string;

    @Column({
      type: DataType.TEXT
    })
    last_ip: string;

    @CreatedAt
    created_on: string;

    @Column
    display_name: string;

    @Index
    @Column({
      type: DataType.INTEGER,
      defaultValue: 1,
      allowNull: false
    })
    active: number;

    @Column
    last_seen: string;

    @Index
    @Column({
      allowNull: false,
      type: DataType.TEXT,
      unique: true
    })
    phone: string
    token: string;
    role: any;
    type:string;

    @BelongsTo(()=>Roles)
    userRole:Roles
}
