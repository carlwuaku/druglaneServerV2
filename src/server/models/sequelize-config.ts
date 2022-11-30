import { Sequelize } from 'sequelize-typescript'
import { constants } from '../../constants'
import { Activities } from './Activities';
import { Branches } from './Branches';
import { CustomerDiagnostics } from './CustomerDiagnostics';
import { Customers } from './Customers';
import { DailyRecords } from './DailyRecords';
import { DbBackups } from './DbBackups';
import { DbSync } from './DbSync';
import { DiagnosticTests } from './diagnosticTests';
import { DrugInfo } from './DrugInfo';
import { IncomingPayments } from './IncomingPayments';
import { InsuranceProviders } from './InsuranceProviders';
import { ItemActiveIngredients } from './ItemActiveIngredients';
import { OnlineBackups } from './OnlineBackups';
import { OutgoingPayments } from './OutgoingPayments';
import { Permissions } from './permissions';
import { ProductBatches } from './ProductBatches';
import { Products } from './products';
import { PurchaseDetails } from './PurchaseDetails';
import { Purchases } from './purchases';
import { ReceivedTransferDetails } from './ReceivedTransferDetails';
import { ReceivedTransfers } from './ReceivedTransfers';
import { Refills } from './Refills';
import { Roles } from './roles';
import { RolePermissions } from './RolePermissions';
import { Sales } from './Sales';
import { SalesDetails } from './SalesDetails';
import { Settings } from './Settings';
import { StockAdjustment } from './StockAdjustment';
import { StockAdjustmentPending } from './StockAdjustmentPending';
import { StockAdjustmentSessions } from './StockAdjustmentSessions';
import { StockValues } from './StockValues';
import { TransferDetails } from './TransferDetails';
import { Transfers } from './transfers';
import { Users } from './Users';
import { UserSessions } from './UserSessions';
import { Vendors } from './vendors';
const storage_path = constants.db_path;// path.join(constants.settings_location,constants.db_filename) ;//replace with constants.database_name
const connection = new Sequelize({
  dialect: 'sqlite',
  storage: storage_path 
})

connection.addModels([Activities, Branches, CustomerDiagnostics, Customers, DailyRecords, DbBackups, DbSync,
DiagnosticTests, DrugInfo, IncomingPayments, InsuranceProviders, ItemActiveIngredients, OnlineBackups, OutgoingPayments,
Permissions, ProductBatches, Products, PurchaseDetails, Purchases, ReceivedTransferDetails, ReceivedTransfers, Refills,
RolePermissions, Roles, Sales, SalesDetails, Settings, StockAdjustment, StockAdjustmentPending, StockAdjustmentSessions, 
StockValues, TransferDetails, Transfers, Users, UserSessions, Vendors])

export { connection as sequelize };
