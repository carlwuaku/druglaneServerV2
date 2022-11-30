import { Table, Model, Column } from "sequelize-typescript";

@Table({
   tableName: 'insurance_providers',
   modelName: 'InsuranceProviders'
})
export class InsuranceProviders extends Model{
  @Column
  name:string;
}
