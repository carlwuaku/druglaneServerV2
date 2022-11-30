"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("../../constants");
const Activities_1 = require("./Activities");
const Branches_1 = require("./Branches");
const CustomerDiagnostics_1 = require("./CustomerDiagnostics");
const Customers_1 = require("./Customers");
const DailyRecords_1 = require("./DailyRecords");
const DbBackups_1 = require("./DbBackups");
const DbSync_1 = require("./DbSync");
const diagnosticTests_1 = require("./diagnosticTests");
const DrugInfo_1 = require("./DrugInfo");
const IncomingPayments_1 = require("./IncomingPayments");
const InsuranceProviders_1 = require("./InsuranceProviders");
const ItemActiveIngredients_1 = require("./ItemActiveIngredients");
const OnlineBackups_1 = require("./OnlineBackups");
const OutgoingPayments_1 = require("./OutgoingPayments");
const permissions_1 = require("./permissions");
const ProductBatches_1 = require("./ProductBatches");
const products_1 = require("./products");
const PurchaseDetails_1 = require("./PurchaseDetails");
const purchases_1 = require("./purchases");
const ReceivedTransferDetails_1 = require("./ReceivedTransferDetails");
const ReceivedTransfers_1 = require("./ReceivedTransfers");
const Refills_1 = require("./Refills");
const roles_1 = require("./roles");
const RolePermissions_1 = require("./RolePermissions");
const Sales_1 = require("./Sales");
const SalesDetails_1 = require("./SalesDetails");
const Settings_1 = require("./Settings");
const StockAdjustment_1 = require("./StockAdjustment");
const StockAdjustmentPending_1 = require("./StockAdjustmentPending");
const StockAdjustmentSessions_1 = require("./StockAdjustmentSessions");
const StockValues_1 = require("./StockValues");
const TransferDetails_1 = require("./TransferDetails");
const transfers_1 = require("./transfers");
const Users_1 = require("./Users");
const UserSessions_1 = require("./UserSessions");
const vendors_1 = require("./vendors");
const storage_path = constants_1.constants.db_path; // path.join(constants.settings_location,constants.db_filename) ;//replace with constants.database_name
const connection = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite',
    storage: storage_path
});
exports.sequelize = connection;
connection.addModels([Activities_1.Activities, Branches_1.Branches, CustomerDiagnostics_1.CustomerDiagnostics, Customers_1.Customers, DailyRecords_1.DailyRecords, DbBackups_1.DbBackups, DbSync_1.DbSync,
    diagnosticTests_1.DiagnosticTests, DrugInfo_1.DrugInfo, IncomingPayments_1.IncomingPayments, InsuranceProviders_1.InsuranceProviders, ItemActiveIngredients_1.ItemActiveIngredients, OnlineBackups_1.OnlineBackups, OutgoingPayments_1.OutgoingPayments,
    permissions_1.Permissions, ProductBatches_1.ProductBatches, products_1.Products, PurchaseDetails_1.PurchaseDetails, purchases_1.Purchases, ReceivedTransferDetails_1.ReceivedTransferDetails, ReceivedTransfers_1.ReceivedTransfers, Refills_1.Refills,
    RolePermissions_1.RolePermissions, roles_1.Roles, Sales_1.Sales, SalesDetails_1.SalesDetails, Settings_1.Settings, StockAdjustment_1.StockAdjustment, StockAdjustmentPending_1.StockAdjustmentPending, StockAdjustmentSessions_1.StockAdjustmentSessions,
    StockValues_1.StockValues, TransferDetails_1.TransferDetails, transfers_1.Transfers, Users_1.Users, UserSessions_1.UserSessions, vendors_1.Vendors]);
