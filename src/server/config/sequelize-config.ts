import { Sequelize } from 'sequelize-typescript'
import models from '../models/index'
import { config } from './config';
import { Activities } from '../models/Activities';
import { Branches } from '../models/Branches';
import { CustomerDiagnostics } from '../models/CustomerDiagnostics';
import { Customers } from '../models/Customers';
import { DailyRecords } from '../models/DailyRecords';
import { DbBackups } from '../models/DbBackups';
import { DbSync } from '../models/DbSync';
import { DiagnosticTests } from '../models/DiagnosticTests';
import { IncomingPayments } from '../models/IncomingPayments';
import { InsuranceProviders } from '../models/InsuranceProviders';
import { OnlineBackups } from '../models/OnlineBackups';
import { OutgoingPayments } from '../models/OutgoingPayments';
import { Permissions } from '../models/Permissions';
import { ProductBatches } from '../models/ProductBatches';
import { Products } from '../models/Products';
import { PurchaseDetails } from '../models/PurchaseDetails';
import { Purchases } from '../models/Purchases';
import { ReceivedTransferDetails } from '../models/ReceivedTransferDetails';
import { ReceivedTransfers } from '../models/ReceivedTransfers';
import { Refills } from '../models/Refills';
import { Roles } from '../models/Roles';
import { RolePermissions } from '../models/RolePermissions';
import { Sales } from '../models/Sales';
import { SalesDetails } from '../models/SalesDetails';
import { Settings } from '../models/Settings';
import { StockAdjustment } from '../models/StockAdjustment';
import { StockAdjustmentPending } from '../models/StockAdjustmentPending';
import { StockAdjustmentSessions } from '../models/StockAdjustmentSessions';
import { StockValues } from '../models/StockValues';
import { TransferDetails } from '../models/TransferDetails';
import { Transfers } from '../models/Transfers';
import { Users } from '../models/Users';
import { UserSessions } from '../models/UserSessions';
import { Vendors } from '../models/Vendors';
const connection = new Sequelize(config[process.env.NODE_ENV]);

connection.addModels(models);

Permissions.belongsToMany(Roles, {
    through: RolePermissions,
    foreignKey: 'permission_id'
});

Roles.belongsToMany(Permissions, {
    through: RolePermissions,
    foreignKey: 'role_id'
})

Customers.hasMany(CustomerDiagnostics, {
    foreignKey:'customer'
})
CustomerDiagnostics.belongsTo(Customers)

Customers.hasMany(SalesDetails, {
    foreignKey: 'customer'
})
SalesDetails.belongsTo(Customers);

Products.hasMany(SalesDetails, {
    foreignKey: 'product'
})
SalesDetails.belongsTo(Products)

Products.hasMany(SalesDetails, {
    foreignKey: 'product'
})
SalesDetails.belongsTo(Products)


Products.hasMany(PurchaseDetails, {
    foreignKey: 'product'
})
PurchaseDetails.belongsTo(Products)


Products.hasMany(TransferDetails, {
    foreignKey: 'product'
})
TransferDetails.belongsTo(Products)

Products.hasMany(ReceivedTransferDetails, {
    foreignKey: 'product'
})
ReceivedTransferDetails.belongsTo(Products)

Products.hasMany(StockAdjustment, {
    foreignKey: 'product'
})
StockAdjustment.belongsTo(Products)

Products.hasMany(StockAdjustmentPending, {
    foreignKey: 'product'
})
StockAdjustmentPending.belongsTo(Products)

//transferdetails->product
//stockadjustment->product
//receivedtrans->product
//





export { connection as sequelize };
