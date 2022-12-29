import { Table, Model, Column, CreatedAt } from "sequelize-typescript";

@Table({
   tableName: 'insurance_providers',
  modelName: 'InsuranceProviders',
  paranoid: true,
})
export class InsuranceProviders extends Model{
  @Column
  name: string;
  
  @CreatedAt
  created_on: string

  updatedAt: false
}
