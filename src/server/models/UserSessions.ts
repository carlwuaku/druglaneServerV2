import { Column, CreatedAt, DataType, ForeignKey, Index, Model, Table } from "sequelize-typescript";
import { Users } from "./Users";

@Table({
  tableName: 'user_sessions',
  modelName: 'UserSessions'
})

export class UserSessions extends Model{
  @ForeignKey(()=> Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id: number;

  @Index 
  @Column
  token:string;

  @CreatedAt
  created_on:string;

  @Column({
    type: DataType.DATE
  })
  expires:string
}

