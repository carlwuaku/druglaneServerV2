import { Table, Model, Column, DataType, PrimaryKey, CreatedAt, ForeignKey } from "sequelize-typescript";
import { Users } from "./Users";

@Table({
   tableName: 'activities',
   modelName: 'Activities'
})

export class Activities extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false,
        
    })
    activity:string;

    @PrimaryKey
    @Column({
        type: DataType.BIGINT,
    })
    activity_id:string;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        
    })
    user_id:string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        
    })
    module:string;



    @CreatedAt
    created_on:string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    deleted:string;
    
}