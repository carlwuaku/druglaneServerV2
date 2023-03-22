import { Sequelize } from 'sequelize-typescript'
import models from '../models/index'
import { config } from './config';
import { Branches } from '../models/Branches';
import { CustomerDiagnostics } from '../models/CustomerDiagnostics';
import { Customers } from '../models/Customers';
import { Permissions } from '../models/Permissions';
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
import { StockAdjustment } from '../models/StockAdjustment';
import { StockAdjustmentPending } from '../models/StockAdjustmentPending';
import { TransferDetails } from '../models/TransferDetails';
import { Transfers } from '../models/Transfers';
import { Users } from '../models/Users';
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
});

Roles.hasMany(Users, {
    foreignKey: 'role_id'
})

Customers.hasMany(CustomerDiagnostics, {
    foreignKey: 'customer', 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
CustomerDiagnostics.belongsTo(Customers, {
    foreignKey: 'customer'
})

Customers.hasMany(SalesDetails, {
    foreignKey: 'customer',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
})
SalesDetails.belongsTo(Customers, {
    foreignKey: 'customer'
});

Products.hasMany(SalesDetails, {
    foreignKey: 'product',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
SalesDetails.belongsTo(Products, {
    foreignKey: 'product'
})


Products.hasMany(PurchaseDetails, {
    foreignKey: 'product',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
PurchaseDetails.belongsTo(Products, {
    foreignKey: 'product'
})


Products.hasMany(TransferDetails, {
    foreignKey: 'product',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
TransferDetails.belongsTo(Products, {
    foreignKey: 'product'
})

Products.hasMany(ReceivedTransferDetails, {
    foreignKey: 'product',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
ReceivedTransferDetails.belongsTo(Products, {
    foreignKey: 'product'
})

Products.hasMany(StockAdjustment, {
    foreignKey: 'product',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
StockAdjustment.belongsTo(Products, {
    foreignKey: 'product'})

Products.hasMany(StockAdjustmentPending, {
    foreignKey: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
StockAdjustmentPending.belongsTo(Products, {
    foreignKey: 'product'})

Purchases.hasMany(PurchaseDetails, {
    foreignKey: 'code',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
PurchaseDetails.belongsTo(Purchases, {
    foreignKey: 'code'
});

Vendors.hasMany(Purchases, {
    foreignKey: 'vendor',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
Purchases.belongsTo(Vendors, {
    foreignKey: 'vendor'});

ReceivedTransfers.hasMany(ReceivedTransferDetails, {
    foreignKey: 'code',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
ReceivedTransferDetails.belongsTo(ReceivedTransfers, {
    foreignKey: 'code'
});

Branches.hasMany(ReceivedTransfers, {
    foreignKey: 'sender',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
ReceivedTransfers.belongsTo(Branches, {
    foreignKey: 'sender'
});

Customers.hasMany(Refills, {
    foreignKey: "customer_id",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Refills.belongsTo(Customers, {
    foreignKey: "customer_id"
});

Sales.hasMany(SalesDetails, {
    foreignKey: 'code',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
SalesDetails.belongsTo(Sales, {
    foreignKey: 'code'
});

Customers.hasMany(Sales, {
    foreignKey: 'customer',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Sales.belongsTo(Customers, {
    foreignKey: 'customer'
});


Transfers.hasMany(TransferDetails, {
    foreignKey: 'code',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
TransferDetails.belongsTo(Transfers);

Branches.hasMany(Transfers, {
    foreignKey: 'recipient',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
Transfers.belongsTo(Branches, {
    foreignKey: 'recipient'
});





//transferdetails->product
//stockadjustment->product
//receivedtrans->product
//





export { connection as sequelize };
