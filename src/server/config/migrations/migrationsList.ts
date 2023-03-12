import { InputMigrations } from "umzug";
import {
    STRING, INTEGER, DATE, DOUBLE, NOW, Op, QueryInterface, QueryOptions,
    DataTypes, Sequelize
} from 'sequelize';
import { Products } from "../../models/Products";
import models from '../../models/index'
import { query } from "express";
import { sequelize } from "../sequelize-config";
import { Customers } from "../../models/Customers";
import { Activities } from "../../models/Activities";
import { Permissions } from "../../models/Permissions";
import { allPermissions, defaultSalesPersonPermissions } from "../../config/permissions";
import { Roles } from "../../models/Roles";
import { RolePermissions } from "../../models/RolePermissions";
import { Users } from "../../models/Users";
import { UserSessions } from "../../models/UserSessions";
import { Sales } from "../../models/Sales";
import { InsuranceProviders } from "../../models/InsuranceProviders";
import { SalesDetails } from "../../models/SalesDetails";
import { Purchases } from "../../models/Purchases";
import { PurchaseDetails } from "../../models/PurchaseDetails";
import { Vendors } from "../../models/Vendors";
import { ReceivedTransfers } from "../../models/ReceivedTransfers";
import { ReceivedTransferDetails } from "../../models/ReceivedTransferDetails";
import { Branches } from "../../models/Branches";
import { Transfers } from "../../models/Transfers";
import { TransferDetails } from "../../models/TransferDetails";
import { Settings } from "../../models/Settings";
import { StockAdjustment } from "../../models/StockAdjustment";
import { StockAdjustmentSessions } from "../../models/StockAdjustmentSessions";
import { CustomerDiagnostics } from "../../models/CustomerDiagnostics";
import { DiagnosticTests } from "../../models/DiagnosticTests";
import { StockAdjustmentPending } from "../../models/StockAdjustmentPending";
import { DbBackups } from "../../models/DbBackups";
import { Refills } from "../../models/Refills";
import { StockValues } from "../../models/StockValues";
import { OutgoingPayments } from "../../models/OutgoingPayments";
import { OnlineBackups } from "../../models/OnlineBackups";
import { DbSync } from "../../models/DbSync";
import { IncomingPayments } from "../../models/IncomingPayments";

export const migrationsList: InputMigrations<QueryInterface> = [
    {
        name: "2019-001-initialMigrations-addActvities",
        async up({ context: queryInterface }) {
            
            await queryInterface.createTable(Activities.tableName, {
                activity_id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                user_id: {
                    type: STRING
                },
                activity: {
                    type: STRING
                },
                module: {
                    type: INTEGER
                },
                created_on: {
                    type: STRING,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                deleted: {
                    allowNull: true,
                    type: INTEGER,
                    defaultValue: 0

                }
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Activities.tableName);
        }
    },
    {
        name: "2019-002-initialMigrations-addCustomers",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Customers.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                name: {
                    type: STRING,
                    allowNull: false
                },
                sex: {
                    type: STRING
                },
                email: {
                    type: STRING
                },
                phone: {
                    type: STRING
                },
                location: {
                    type: STRING
                },
                created_on: {
                    type: STRING,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                }
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Customers.tableName);
        }
    },
    {
        name: "2019-003-initialMigrations-createPermissions",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Permissions.tableName, {
                permission_id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                name: {
                    type: STRING,
                    allowNull: false
                },
                description: {
                    type: STRING
                }
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Permissions.tableName);
        }
    }
    ,
    {
        name: "2019-004-initialMigrations-insertPermissions",
        async up({ context: queryInterface }) {

            await queryInterface.bulkInsert(Permissions.tableName,
                [...allPermissions.values()],
                {
                });
        },
        async down({ context: queryInterface }) {
            //no going back
        }
    },
    {
        name: "2019-005-initialMigrations-createRoles",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Roles.tableName, {
                role_id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                role_name: {
                    type: STRING,
                    allowNull: false
                },
                description: {
                    type: STRING
                }
            })
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Permissions.tableName);
        }
    },
    {
        name: "2019-006-initialMigrations-createRolePermissions",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(RolePermissions.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                role_id: {
                    type: INTEGER,
                    allowNull: false
                },
                permission_id: {
                    type: INTEGER,
                    allowNull: false
                }
            });

            await queryInterface.addConstraint(
                RolePermissions.tableName,
                {
                    fields: ['role_id'],
                    type: 'foreign key',
                    name: 'role_permissions_role_id', // useful if using queryInterface.removeConstraint
                    references: {
                        table: Roles.tableName,
                        field: 'role_id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
            await queryInterface.addConstraint(RolePermissions.tableName,
                {
                    fields: ['permission_id'],
                    type: 'foreign key',
                    name: 'role_permissions_permission_id', // useful if using queryInterface.removeConstraint
                    references: {
                        table: Permissions.tableName,
                        field: 'permission_id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(RolePermissions.tableName);
        }
    },

    {
        name: "2019-007-initialMigrations-insertRoles",
        async up({ context: queryInterface }) {

            await queryInterface.bulkInsert(Roles.tableName,
                [
                    {
                        role_id: 1,
                        role_name: 'Branch Manager',
                        description: 'manages day-to-day activities. Receives purchases, manages stock. May also make sales'
                    },
                    {
                        role_id: 2,
                        role_name: 'Sales Person',
                        description: 'serves customers and makes sales. Limited permissions by default'
                    }
                ],
                {
                });
        },
        async down({ context: queryInterface }) {
            //no going back
        }
    },
    {
        name: "2019-008-initialMigrations-insertDefaultPermissions",
        async up({ context: queryInterface }) {
            let objects: object[] = [];
            //do it for the manager. all permissions by default
            allPermissions.forEach(permission => {
                objects.push({ role_id: 1, permission_id: permission.permission_id });
            })

            defaultSalesPersonPermissions.forEach(id => {
                objects.push({role_id: 2, permission_id: id})
            })

            await queryInterface.bulkInsert(RolePermissions.tableName,
                objects,
                {
                });
        },
        async down({ context: queryInterface }) {
            //no going back
        }
    },
    //do users, user_sessions, products...
    {
        name: "2019-009-initialMigrations-createInsurers",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(InsuranceProviders.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                name: {
                    type: STRING,
                    allowNull: false
                }


            });

            await queryInterface.addIndex(InsuranceProviders.tableName,
                ['name']);


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(InsuranceProviders.tableName);
        }
    },

    {
        name: "2019-010-initialMigrations-createVendors",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Vendors.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                name: {
                    type: STRING,
                    allowNull: false
                },
                location: {
                    type: STRING,
                    defaultValue: null
                },
                phone: {
                    type: STRING,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    defaultValue: null
                },
                email: {
                    type: STRING,
                    defaultValue: null
                },
                notes: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                legacy_id: {
                    type: STRING,
                    defaultValue: null
                }


            });

            await queryInterface.addIndex(Vendors.tableName,
                ['name'], {
                unique: true
            });


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Vendors.tableName);
        }
    },
    {
        name: "2019-011-initialMigrations-createBranches",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Branches.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                name: {
                    type: STRING,
                    allowNull: false
                },
                location: {
                    type: STRING,
                    defaultValue: null
                },
                phone: {
                    type: STRING,
                    allowNull: false
                },
                address: {
                    type: STRING,
                    defaultValue: null
                },
                email: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(Branches.tableName,
                ['name'], {
                unique: true
            });


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Branches.tableName);
        }
    },
    {
        name: "2019-012-initialMigrations-createSettings",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Settings.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                name: {
                    type: STRING,
                    allowNull: false
                },
                module: {
                    type: STRING,
                    allowNull: false
                },
                value: {
                    type: STRING,
                    allowNull: false
                }


            });

            await queryInterface.addIndex(Settings.tableName,
                ['name'], {
                unique: true
            });


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Settings.tableName);
        }
    },
    {
        name: "2019-013-initialMigrations-createUsers",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Users.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                role_id: {
                    type: INTEGER,
                    allowNull: false
                },
                email: {
                    type: STRING,
                    allowNull: false
                },
                username: {
                    type: STRING,
                    allowNull: false
                },
                password_hash: {
                    type: STRING,
                    allowNull: false
                },
                last_login: {
                    type: STRING,
                    allowNull: false,
                    defaultValue: ''
                },
                last_ip: {
                    type: STRING,
                    allowNull: false,
                    defaultValue: ''
                },
                created_on: {
                    type: STRING,
                    allowNull: false,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                display_name: {
                    type: STRING,
                    allowNull: false
                },
                active: {
                    type: INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                last_seen: {
                    type: STRING,
                    allowNull: true
                },
                phone: {
                    type: STRING,
                    defaultValue: ''
                }
            });

            await queryInterface.addIndex(Users.tableName,
                ['username'], {
                    unique: true
                });
            await queryInterface.addIndex(Users.tableName,
                ['email'], {
                unique: true
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Users.tableName);
        }
    },
    {
        name: "2019-014-initialMigrations-createUserSessions",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(UserSessions.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                user_id: {
                    type: INTEGER,
                    allowNull: false
                },
                token: {
                    type: STRING,
                    allowNull: false
                },
                expires: {
                    type: STRING,
                    allowNull: false
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }
            });

            await queryInterface.addIndex(UserSessions.tableName,
                ['user_id','token','expires'], {
                unique: true
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(UserSessions.tableName);
        }
    },
    {
        name: "2019-015-initialMigrations-createProducts",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Products.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                name: {
                    type: STRING,
                    allowNull: false
                },
                price: {
                    type: DOUBLE,
                    allowNull: false
                },
                category: {
                    type: STRING,
                    defaultValue: null
                },
                notes: {
                    type: STRING,
                    defaultValue: null
                },
                unit: {
                    type: STRING,
                    defaultValue: null
                },
                picture: {
                    type: STRING,
                    defaultValue: null
                },
                max_stock: {
                    type: DOUBLE,
                    defaultValue: null
                },
                min_stock: {
                    type: DOUBLE,
                    defaultValue: null
                },
                expiry: {
                    type: STRING,
                    defaultValue: null
                },
                barcode: {
                    type: STRING,
                    defaultValue: null
                },
                current_stock: {
                    type: DOUBLE,
                    defaultValue: null
                },
                last_modified: {
                    type: STRING,
                    defaultValue: null
                },
                cost_price: {
                    type: DOUBLE,
                    defaultValue: null
                },
                status: {
                    type: INTEGER,
                    defaultValue: 1
                },
                size: {
                    type: STRING,
                    defaultValue: null
                },
                description: {
                    type: STRING,
                    defaultValue: 1
                },
                shelf: {
                    type: STRING,
                    defaultValue: 1
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }
            });

            await queryInterface.addIndex(Products.tableName,
                ['name'], {
                unique: true
            });

            await queryInterface.addIndex(Products.tableName,
                ['price', 'category', 'max_stock', 'min_stock', 'expiry',
                    'current_stock', 'last_modified',
                    'status']);
            await queryInterface.addIndex(Products.tableName,
                [ 'expiry']);
            await queryInterface.addIndex(Products.tableName,
                [
                    'current_stock']);
            await queryInterface.addIndex(Products.tableName,
                ['description']);
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Products.tableName);
        }
    },
    {
        name: "2019-016-initialMigrations-createSales",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Sales.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                customer: {
                    type: STRING,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    allowNull: false,
                    unique: true
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                amount_paid: {
                    type: DOUBLE,
                    defaultValue: 0
                },
                payment_method: {
                    type: STRING,
                    defaultValue: 'Cash'
                },
                momo_reference: {
                    type: STRING,
                    defaultValue: null
                },
                insurance_provider: {
                    type: STRING,
                    defaultValue: null
                },
                insurance_member_name: {
                    type: STRING,
                    defaultValue: null
                },
                insurance_member_id: {
                    type: STRING,
                    defaultValue: null
                },
                creditor_name: {
                    type: STRING,
                    defaultValue: null
                },
                credit_paid: {
                    type: INTEGER,
                    defaultValue: 0
                },
                discount: {
                    type: DOUBLE,
                    defaultValue: 0
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                shift: {
                    type: STRING,
                    defaultValue: null
                }
                
                
            });

            await queryInterface.addIndex(Sales.tableName,
                ['code'], {
                unique: true
            });

            await queryInterface.addIndex(Sales.tableName,
                ['payment_method',]);
            await queryInterface.addIndex(Sales.tableName,
                ['date',]);
            await queryInterface.addIndex(Sales.tableName,
                ['customer',]);
            
            await queryInterface.addConstraint(
                Sales.tableName,
                {
                    fields: ['insurance_provider'],
                    type: 'foreign key',
                    references: {
                        table: InsuranceProviders.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });
            
            
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Sales.tableName);
        }
    },
    {
        name: "2019-017-initialMigrations-createSalesDetails",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(SalesDetails.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                product: {
                    type: INTEGER,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    allowNull: false
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                price: {
                    type: DOUBLE,
                    allowNull: false
                },
                quantity: {
                    type: DOUBLE,
                    allowNull: false
                },
                cost_price: {
                    type: DOUBLE,
                    allowNull: false
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(SalesDetails.tableName,
                ['code']);

            await queryInterface.addIndex(SalesDetails.tableName,
                ['date',]);

            await queryInterface.addConstraint(
                SalesDetails.tableName,
                {
                    fields: ['code'],
                    type: 'foreign key',
                    references: {
                        table: Sales.tableName,
                        field: 'code',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

            await queryInterface.addConstraint(
                SalesDetails.tableName,
                {
                    fields: ['product'],
                    type: 'foreign key',
                    references: {
                        table: Products.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });

        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(SalesDetails.tableName);
        }
    },
    {
        name: "2019-018-initialMigrations-createPurchases",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Purchases.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                vendor: {
                    type: INTEGER,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    allowNull: false,
                    unique: true
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                amount_paid: {
                    type: DOUBLE,
                    defaultValue: 0
                },
                payment_method: {
                    type: STRING,
                    defaultValue: 'Cash'
                },
                site: {
                    type: STRING,
                    defaultValue: null
                },
                invoice: {
                    type: STRING,
                    defaultValue: null
                },
                last_payment_date: {
                    type: STRING,
                    defaultValue: null
                },
                status: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(Purchases.tableName,
                ['code'], {
                unique: true
            });

            await queryInterface.addIndex(Purchases.tableName,
                ['payment_method',]);
            await queryInterface.addIndex(Purchases.tableName,
                ['date',]);
            await queryInterface.addIndex(Purchases.tableName,
                ['vendor',]);

            await queryInterface.addConstraint(
                Purchases.tableName,
                {
                    fields: ['vendor'],
                    type: 'foreign key',
                    references: {
                        table: Vendors.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Purchases.tableName);
        }
    },
    {
        name: "2019-019-initialMigrations-createPurchaseDetails",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(PurchaseDetails.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                product: {
                    type: INTEGER,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    allowNull: false
                },

                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                price: {
                    type: DOUBLE,
                    allowNull: false
                },
                quantity: {
                    type: DOUBLE,
                    allowNull: false
                },
                selling_price: {
                    type: DOUBLE,
                    allowNull: false
                },
                unit: {
                    type: STRING,
                    allowNull: false
                },
                markup: {
                    type: STRING,
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(PurchaseDetails.tableName,
                ['code']);

            await queryInterface.addIndex(PurchaseDetails.tableName,
                ['date']);

            await queryInterface.addConstraint(
                PurchaseDetails.tableName,
                {
                    fields: ['code'],
                    type: 'foreign key',
                    references: {
                        table: Purchases.tableName,
                        field: 'code',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

            await queryInterface.addConstraint(
                PurchaseDetails.tableName,
                {
                    fields: ['product'],
                    type: 'foreign key',
                    references: {
                        table: Products.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });

        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(PurchaseDetails.tableName);
        }
    },
    {
        name: "2019-020-initialMigrations-createReceivedTransfers",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(ReceivedTransfers.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                sender: {
                    type: INTEGER,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    allowNull: false,
                    unique: true
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                invoice: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(ReceivedTransfers.tableName,
                ['code'], {
                unique: true
            });

            await queryInterface.addIndex(ReceivedTransfers.tableName,
                ['invoice',]);
            await queryInterface.addIndex(ReceivedTransfers.tableName,
                ['date',]);
            await queryInterface.addIndex(ReceivedTransfers.tableName,
                ['sender',]);

            await queryInterface.addConstraint(
                ReceivedTransfers.tableName,
                {
                    fields: ['sender'],
                    type: 'foreign key',
                    references: {
                        table: Branches.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(ReceivedTransfers.tableName);
        }
    },
    {
        name: "2019-021-initialMigrations-createReceivedTransferDetails",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(ReceivedTransferDetails.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                product: {
                    type: INTEGER,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    allowNull: false
                },

                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                expiry: {
                    type: STRING,
                    defaultValue: null
                },
                price: {
                    type: DOUBLE,
                    allowNull: false
                },
                quantity: {
                    type: DOUBLE,
                    allowNull: false
                },
                cost_price: {
                    type: DOUBLE,
                    allowNull: false
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(ReceivedTransferDetails.tableName,
                ['code']);

            await queryInterface.addIndex(ReceivedTransferDetails.tableName,
                ['date']);

            await queryInterface.addConstraint(
                ReceivedTransferDetails.tableName,
                {
                    fields: ['code'],
                    type: 'foreign key',
                    references: {
                        table: ReceivedTransfers.tableName,
                        field: 'code',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

            await queryInterface.addConstraint(
                ReceivedTransferDetails.tableName,
                {
                    fields: ['product'],
                    type: 'foreign key',
                    references: {
                        table: Products.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });

        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(PurchaseDetails.tableName);
        }
    },
    {
        name: "2019-022-initialMigrations-createTransfers",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Transfers.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                receiver: {
                    type: INTEGER,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    allowNull: false,
                    unique: true
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                status: {
                    type: STRING,
                    defaultValue: 'Pending'
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(Transfers.tableName,
                ['code'], {
                unique: true
            });

            await queryInterface.addIndex(Transfers.tableName,
                ['date',]);
            await queryInterface.addIndex(Transfers.tableName,
                ['receiver',]);

            await queryInterface.addConstraint(
                Transfers.tableName,
                {
                    fields: ['receiver'],
                    type: 'foreign key',
                    references: {
                        table: Branches.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Transfers.tableName);
        }
    },
    {
        name: "2019-023-initialMigrations-createTransferDetails",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(TransferDetails.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                product: {
                    type: INTEGER,
                    allowNull: false
                },
                code: {
                    type: STRING,
                    allowNull: false
                },

                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                expiry: {
                    type: STRING,
                    defaultValue: null
                },
                price: {
                    type: DOUBLE,
                    allowNull: false
                },
                quantity: {
                    type: DOUBLE,
                    allowNull: false
                },
                cost_price: {
                    type: DOUBLE,
                    allowNull: false
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(TransferDetails.tableName,
                ['code']);

            await queryInterface.addIndex(TransferDetails.tableName,
                ['date']);

            await queryInterface.addConstraint(
                TransferDetails.tableName,
                {
                    fields: ['code'],
                    type: 'foreign key',
                    references: {
                        table: Transfers.tableName,
                        field: 'code',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

            await queryInterface.addConstraint(
                TransferDetails.tableName,
                {
                    fields: ['product'],
                    type: 'foreign key',
                    references: {
                        table: Products.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });

        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(TransferDetails.tableName);
        }
    },
    
    {
        name: "2019-024-initialMigrations-createStockAdjustment",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(StockAdjustment.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                product: {
                    type: INTEGER,
                    allowNull: false
                },
                quantity_counted: {
                    type: DOUBLE,
                    allowNull: false
                },
                quantity_expected: {
                    type: DOUBLE,
                    allowNull: false
                },
                current_price: {
                    type: DOUBLE,
                    allowNull: false
                },
                
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                code: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                
                cost_price: {
                    type: DOUBLE,
                    allowNull: false
                },
                category: {
                    type: STRING,
                    defaultValue: null
                },
                size: {
                    type: STRING,
                    defaultValue: null
                },
                expiry: {
                    type: STRING,
                    defaultValue: null
                },
                comments: {
                    type: STRING,
                    defaultValue: null
                },
                quantity_expired: {
                    type: DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
                quantity_damaged: {
                    type: DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                }


            });

            await queryInterface.addIndex(StockAdjustment.tableName,
                ['code']);

            await queryInterface.addIndex(StockAdjustment.tableName,
                ['date',]);
            await queryInterface.addIndex(StockAdjustment.tableName,
                ['created_on',]);
            await queryInterface.addIndex(StockAdjustment.tableName,
                ['product',]);

           
            await queryInterface.addConstraint(
                StockAdjustment.tableName,
                {
                    fields: ['product'],
                    type: 'foreign key',
                    references: {
                        table: Products.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });

        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(SalesDetails.tableName);
        }
    },
    {
        name: "2019-025-initialMigrations-createStockAdjustmentSessions",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(StockAdjustmentSessions.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                date: {
                    type: STRING,
                    allowNull: false
                },
                
                code: {
                    type: STRING,
                    allowNull: false
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                status: {
                    type: STRING,
                    defaultValue: 'in_progress'
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                }


            });

            await queryInterface.addIndex(StockAdjustmentSessions.tableName,
                ['code'],
                {
                unique: true
            });

            await queryInterface.addIndex(StockAdjustmentSessions.tableName,
                ['created_on']);



        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(StockAdjustmentSessions.tableName);
        }
    },

    {
        name: "2019-026-initialMigrations-createCustomerDiagnostics",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(CustomerDiagnostics.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                customer: {
                    type: INTEGER,
                    allowNull: false
                },

                test: {
                    type: STRING,
                    allowNull: false
                },
                data: {
                    type: STRING,
                    allowNull: false
                },
                comments: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(CustomerDiagnostics.tableName,
                ['test'], {
                    unique: true
                });
            await queryInterface.addConstraint(
                CustomerDiagnostics.tableName,
                {
                    fields: ['customer'],
                    type: 'foreign key',
                    references: {
                        table: Customers.tableName,
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(CustomerDiagnostics.tableName);
        }
    },


    {
        name: "2019-027-initialMigrations-createDiagnosticTests",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(DiagnosticTests.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                test_name: {
                    type: STRING,
                    allowNull: false
                },

                parameters: {
                    type: STRING,
                    allowNull: false
                },
                comments: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(DiagnosticTests.tableName,
                ['test_name'], {
                    unique: true
                });
            await queryInterface.bulkInsert(DiagnosticTests.tableName,
                [
                    {
                        test_name: 'Blood Glucose Test',
                        parameters: 'value (mmol/L)',
                        comments: `Normal ranges for non-diabetic: Before meals - 4.0 to 5.9 mmol/L; After meals - under 7.8 mmol/L; 
      For diabetics: Before meals - 4 to 7 mmol / L; After meals - 5 to 9 mmol / L`,
                    },
                    {
                        test_name: 'Blood Pressure',
                        parameters: `systolic, diastolic`,
                        comments: `90/60mmHg  to 120/80mmHg - ideal,
      140/90mmHg or higher - high,
      90/60mmHg or lower - low`,
                    },
                    {
                        test_name: 'Total Blood Cholesterol',
                        parameters: `value (mmol/L)`,
                        comments: `Below 5.2 mmol/L - normal, 5.2 to 6.2 mmol/L - Borderline High, Above 6.2 mmol/L - High`,
                    }
                ])


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(DiagnosticTests.tableName);
        }
    },
    {
        name: "2019-028-initialMigrations-createStockAdjustmentPending",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(StockAdjustmentPending.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                date: {
                    type: STRING,
                    defaultValue: null
                },
                product: {
                    type: INTEGER,
                    allowNull: false
                },
                quantity_counted: {
                    type: DOUBLE,
                    allowNull: false
                },
                quantity_expected: {
                    type: DOUBLE,
                    allowNull: false
                },
                current_price: {
                    type: DOUBLE,
                    allowNull: false
                },

                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                code: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },

                cost_price: {
                    type: DOUBLE,
                    allowNull: false
                },
                category: {
                    type: STRING,
                    defaultValue: null
                },
                size: {
                    type: STRING,
                    defaultValue: null
                },
                expiry: {
                    type: STRING,
                    defaultValue: null
                },
                comments: {
                    type: STRING,
                    defaultValue: null
                },
                quantity_expired: {
                    type: DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
                quantity_damaged: {
                    type: DOUBLE,
                    allowNull: false,
                    defaultValue: 0
                },
                shelf: {
                    type: STRING,
                    defaultValue: null
                },
                unit: {
                    type: STRING,
                    defaultValue: null
                }


            });

            await queryInterface.addIndex(StockAdjustmentPending.tableName,
                ['code']);

            await queryInterface.addIndex(StockAdjustmentPending.tableName,
                ['date',]);
            await queryInterface.addIndex(StockAdjustmentPending.tableName,
                ['created_on',]);
            await queryInterface.addIndex(StockAdjustmentPending.tableName,
                ['product',]);


            await queryInterface.addConstraint(
                StockAdjustmentPending.tableName,
                {
                    fields: ['product'],
                    type: 'foreign key',
                    references: {
                        table: Products.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });

        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(StockAdjustmentPending.tableName);
        }
    },

    {
        name: "2019-029-initialMigrations-createdbBackups",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(DbBackups.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                file_name: {
                    type: STRING,
                    defaultValue: null
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                description: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                uploaded: {
                    type: STRING,
                    defaultValue: null
                },
                db_version: {
                    type: STRING,
                    defaultValue: null
                }


            });

            await queryInterface.addIndex(DbBackups.tableName,
                ['file_name', 'created_on', 'description', 'uploaded',
                    'db_version']);




        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(DbBackups.tableName);
        }
    },
    {
        name: "2019-030-initialMigrations-createRefills",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(Refills.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                product: {
                    type: STRING,
                    allowNull: false,
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                start_date: {
                    type: STRING,
                    allowNull: false,
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                product_id: {
                    type: INTEGER,
                    defaultValue: null
                },
                quantity: {
                    type: DOUBLE,
                    allowNull: false,
                },
                end_date: {
                    type: STRING,
                    defaultValue: null
                },
                status: {
                    type: STRING,
                    defaultValue: null
                },
                customer_id: {
                    type: INTEGER,
                    defaultValue: null
                },
                customer_name: {
                    type: STRING,
                    defaultValue: null
                }


            });

            await queryInterface.addIndex(Refills.tableName,
                ['end_date']);
            await queryInterface.addIndex(Refills.tableName,
                ['start_date']);
            await queryInterface.addIndex(Refills.tableName,
                ['status']);
            
            await queryInterface.addConstraint(
                Refills.tableName,
                {
                    fields: ['product'],
                    type: 'foreign key',
                    references: {
                        table: Products.tableName,
                        field: 'id',
                    },
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                });


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(Refills.tableName);
        }
    },
    {
        name: "2019-031-initialMigrations-createStockValues",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(StockValues.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                date: {
                    type: STRING,
                    allowNull: false
                },
                last_modified: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                selling_value: {
                    type: DOUBLE,
                    allowNull: false
                },
                cost_value: {
                    type: DOUBLE,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });



        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(StockValues.tableName);
        }
    },
    {
        name: "2019-032-initialMigrations-createOutgoingPaymets",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(OutgoingPayments.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                date: {
                    type: STRING,
                    allowNull: false
                },
                amount: {
                    type: DOUBLE,
                    allowNull: false
                },
                type: {
                    type: STRING,
                    allowNull: false
                },
                recipient: {
                    type: STRING,
                    allowNull: false
                },
                payment_method: {
                    type: STRING,
                    defaultValue: 'Cash'
                },
                transaction_id: {
                    type: STRING,
                    defaultValue: null
                },
                item_code: {
                    type: STRING,
                    defaultValue: null
                },
                notes: {
                    type: STRING,
                    defaultValue: null
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(OutgoingPayments.tableName,
                ['date']);
            await queryInterface.addIndex(OutgoingPayments.tableName,
                ['type']);
            await queryInterface.addIndex(OutgoingPayments.tableName,
                ['recipient']);
            await queryInterface.addIndex(OutgoingPayments.tableName,
                ['created_on']);


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(OutgoingPayments.tableName);
        }
    },
    
    {
        name: "2019-034-initialMigrations-createOnlineBackups",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(OnlineBackups.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                date: {
                    type: STRING,
                    allowNull: false
                },
                url: {
                    type: STRING,
                    allowNull: false
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(OnlineBackups.tableName,
                ['date']);


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(OnlineBackups.tableName);
        }
    },
    {
        name: "2019-035-initialMigrations-createDBSync",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(DbSync.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                type: {
                    type: STRING,
                    allowNull: false
                },
                action: {
                    type: STRING,
                    defaultValue: null
                },
                data: {
                    type: STRING,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(DbSync.tableName,
                ['created_on']);


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(DbSync.tableName);
        }
    },
    {
        name: "2019-036-initialMigrations-createIncomingPaymets",
        async up({ context: queryInterface }) {

            await queryInterface.createTable(IncomingPayments.tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                date: {
                    type: STRING,
                    allowNull: false
                },
                amount: {
                    type: DOUBLE,
                    allowNull: false
                },
                type: {
                    type: STRING,
                    allowNull: false
                },
                payer: {
                    type: STRING,
                    allowNull: false
                },
                payment_method: {
                    type: STRING,
                    defaultValue: 'Cash'
                },
                transaction_id: {
                    type: STRING,
                    defaultValue: null
                },
                item_code: {
                    type: STRING,
                    defaultValue: null
                },
                notes: {
                    type: STRING,
                    defaultValue: null
                },
                created_by: {
                    type: INTEGER,
                    defaultValue: null
                },
                created_on: {
                    type: STRING,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                }


            });

            await queryInterface.addIndex(IncomingPayments.tableName,
                ['date']);
            await queryInterface.addIndex(IncomingPayments.tableName,
                ['type']);
            await queryInterface.addIndex(IncomingPayments.tableName,
                ['payer']);
            await queryInterface.addIndex(IncomingPayments.tableName,
                ['created_on']);


        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable(IncomingPayments.tableName);
        }
    },
















    {
        name: "20210314155622-addCustomerDob",
        async up({ context: queryInterface }) {
            
            await queryInterface.addColumn(Customers.tableName, 'date_of_birth',
                {
                    type: DATE
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn(Customers.tableName, 'date_of_birth');
 
        }
    },
    {
        name: "20210314180101-create-product-batches",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('ProductBatches', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                batch_number: {
                    type: STRING
                },
                expiry: {
                    type: DATE
                },
                barcode: {
                    type: STRING
                },
                product: {
                    type: INTEGER
                },
                purchase_code: {
                    type: STRING
                },
                createdAt: {
                    allowNull: true,
                    type: DATE,

                },
                updatedAt: {
                    allowNull: true,
                    type: DATE
                }
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('ProductBatches');
        }
    },
    {
        name: "20210315154011-addQuantityToProductBatches",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('productbatches', 'quantity',
                {
                    type: DOUBLE
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('productbatches', 'quantity');

        }
    },
    {
        name: "20210317181610-addQuantitySoldToproductBatches",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('productbatches', 'quantity_sold',
                {
                    type: DOUBLE,
                    defaultValue: 0
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('productbatches', 'quantity_sold');

        }
    },
    {
        name: "20210324143037-create-daily-records",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('dailyRecords', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER,

                },
                date: {
                    type: DATE
                }, amount: {
                    type: DOUBLE
                }, shift: {
                    type: STRING
                }, created_by: {
                    type: INTEGER
                },
                created_on: {
                    defaultValue: NOW,
                    allowNull: true,
                    type: DATE,

                }
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('dailyRecords');

        }
    },
    {
        name: "20210324173726-addPaymentMethodsToDailyRecords",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('dailyRecords', 'cash',
                {
                    type: DOUBLE,
                    defaultValue: 0
                });
            await queryInterface.addColumn('dailyRecords', 'momo',
                {
                    type: DOUBLE,
                    defaultValue: 0
                });
            await queryInterface.addColumn('dailyRecords', 'insurance',
                {
                    type: DOUBLE,
                    defaultValue: 0
                });
            await queryInterface.addColumn('dailyRecords', 'credit',
                {
                    type: DOUBLE,
                    defaultValue: 0
                });
            await queryInterface.addColumn('dailyRecords', 'pos',
                {
                    type: DOUBLE,
                    defaultValue: 0
                });

            await queryInterface.addColumn('dailyRecords', 'cheque',
                {
                    type: DOUBLE,
                    defaultValue: 0
                });
            await queryInterface.addColumn('dailyRecords', 'other',
                {
                    type: DOUBLE,
                    defaultValue: 0
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('dailyRecords', 'cash');
            await queryInterface.removeColumn('dailyRecords', 'momo');
            await queryInterface.removeColumn('dailyRecords', 'insurance');
            await queryInterface.removeColumn('dailyRecords', 'credit');
            await queryInterface.removeColumn('dailyRecords', 'pos');
            await queryInterface.removeColumn('dailyRecords', 'cheque');
            await queryInterface.removeColumn('dailyRecords', 'other');

        }
    },
    {
        name: "20210409084451-createSalesBatches",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('sales_batches', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER,

                },
                date: {
                    type: DATE
                },
                batch_number: {
                    type: STRING
                },


                product: {
                    type: INTEGER
                },
                quantity: {
                    type: DOUBLE
                },
                code: {
                    type: STRING
                }, created_by: {
                    type: INTEGER
                },
                created_on: {
                    defaultValue: NOW,
                    allowNull: true,
                    type: DATE,

                }
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('sales_batches');

        }
    },
    {
        name: "20210409085254-addExpiryToSalesBatches",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('sales_batches', 'expiry',
                {
                    type: DATE
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('sales_batches', 'expiry');

        }
    },
    {
        name: "20210409095027-addPreferredVendorToProducts",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('products', 'preferred_vendor',
                {
                    type: INTEGER
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('products', 'preferred_vendor');

        }
    },
    {
        name: "20210626115902-createTokensTable",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('tokens', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER,

                },
                name: {
                    type: STRING
                },
                token: {
                    type: STRING
                },
                created_on: {
                    defaultValue: NOW,
                    allowNull: true,
                    type: DATE,

                }
            });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('tokens`');

        }
    },
    {
        name: "20210824173831-addOnlineToUsers",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('users', 'allow_online',
                {
                    type: STRING,
                    defaultValue: 'no'
                })
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('users', 'allow_online');

        }
    },
    {
        name: "20210926105345-updateProductsTable",
        async up({ context: queryInterface }) {

        },
        async down({ context: queryInterface }) {

        }
    },
    {
        name: "20211023131213-insertTaxSetting",
        async up({ context: queryInterface }) {
            await queryInterface.bulkInsert('settings', [{
                name: 'tax',
                module: 'System',
                value: '0'
            }],
                {
                    // ignoreDuplicates: true
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.bulkDelete('settings', {
                name: 'tax'
            })
        }
    },
    {
        name: "20211023134920-addTaxToSales",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('sales', 'tax',
                {
                    type: DOUBLE,
                    defaultValue: 0
                })
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('sales', 'tax');

        }
    },
    {
        name: "20211024133528-insertBatchSetting",
        async up({ context: queryInterface }) {
            const queryOptions: QueryOptions = {

            }
            await queryInterface.bulkInsert('settings',
                [{
                    name: 'activate_batch_mode',
                    module: 'System',
                    value: 'no'
                }],
                {

                }
            )

        },
        async down({ context: queryInterface }) {
            await queryInterface.bulkDelete('settings', {
                name: 'activate_batch_mode'
            })
        }
    },
    {
        name: "20211109143824-addLogoToSettings",
        async up({ context: queryInterface }) {
            // const logo_exists = await Settings.findAll({
            //     where: {
            //         name: { [Op.in]: ['logo','receipt_logo']}
            //     }
            // })
            // console.log("logo exists",logo_exists)
            const data: any[] = [{
                name: 'logo',
                module: 'System',
                value: ''
            },
            {
                name: 'receipt_logo',
                module: 'System',
                value: 'no'
            }];
            await queryInterface.bulkInsert('settings', data)


        },
        async down({ context: queryInterface }) {
            await queryInterface.bulkDelete('settings', {
                name: {
                    [Op.in]: ['logo',
                        'receipt_logo']
                }
            })
        }
    },
    {
        name: "20211121152934-productsAddDrugInfo",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('products', 'is_drug',
                {
                    type: STRING,
                    defaultValue: 'yes'
                });
            await queryInterface.addColumn('products', 'generic_name',
                {
                    allowNull: true,
                    type: STRING,
                    defaultValue: null
                });
            await queryInterface.addColumn('products', 'contraindications',
                {
                    allowNull: true,
                    type: STRING,
                    defaultValue: null
                });
            await queryInterface.addColumn('products', 'pregnancy',
                {
                    allowNull: true,
                    type: STRING,
                    defaultValue: null
                });
            await queryInterface.addColumn('products', 'side_effects',
                {
                    allowNull: true,
                    type: STRING,
                    defaultValue: null
                });
            await queryInterface.addColumn('products', 'caution',
                {
                    allowNull: true,
                    type: STRING,
                    defaultValue: null
                });
            await queryInterface.addColumn('products', 'indications',
                {
                    allowNull: true,
                    type: STRING,
                    defaultValue: null
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('products', 'is_drug');
            await queryInterface.removeColumn('products', 'generic_name');
            await queryInterface.removeColumn('products', 'contraindications');
            await queryInterface.removeColumn('products', 'pregnancy');
            await queryInterface.removeColumn('products', 'side_effects');
            await queryInterface.removeColumn('products', 'caution');
            await queryInterface.removeColumn('products', 'indications');

        }
    },
    {
        name: "20211121154018-addStoresTables",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('stores', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER,

                },
                name: {
                    type: STRING
                },

                created_on: {
                    defaultValue: NOW,
                    allowNull: true,
                    type: DATE,

                }
            });

            await queryInterface.createTable('store_inventory', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER,

                },
                product: {
                    type: INTEGER,
                },
                store: {
                    type: INTEGER,
                },
                max_stock: {
                    type: DOUBLE
                },
                min_stock: {
                    type: DOUBLE
                },
                current_stock: {
                    type: DOUBLE
                },
                expiry: {
                    type: DATE
                },

                created_on: {
                    defaultValue: NOW,
                    allowNull: true,
                    type: DATE,

                }
            });

            await queryInterface.addConstraint(
                'store_inventory',
                {
                    fields: ['product'],
                    type: 'foreign key',
                    name: 'products_storeInventory_product', // useful if using queryInterface.removeConstraint
                    references: {
                        table: 'products',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
            await queryInterface.addConstraint('store_inventory',
                {
                    fields: ['store'],
                    type: 'foreign key',
                    name: 'products_storeInventory_store', // useful if using queryInterface.removeConstraint
                    references: {
                        table: 'stores',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('stores');
            await queryInterface.dropTable('store_inventory');

        }
    },
    {
        name: "20211121170321-addRequisitionTables",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('requisitions', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER,

                },
                code: {
                    allowNull: false,
                    type: STRING
                },
                sender: {
                    allowNull: false,
                    type: INTEGER
                },
                recipient: {
                    allowNull: false,
                    type: INTEGER
                },

                created_on: {
                    defaultValue: NOW,
                    allowNull: true,
                    type: DATE,

                },
                created_by: {
                    defaultValue: null,
                    allowNull: true,
                    type: INTEGER,

                }, status: {
                    allowNull: false,
                    defaultValue: 'Pending',
                    type: STRING
                }
            });

            await queryInterface.createTable('requisition_details', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER,

                },
                product: {
                    type: INTEGER,
                },
                code: {
                    type: STRING,
                },
                price: {
                    type: DOUBLE
                },
                cost_price: {
                    type: DOUBLE
                },
                quantity: {
                    type: DOUBLE
                },
                expiry: {
                    type: DATE
                },

                created_on: {
                    defaultValue: NOW,
                    allowNull: true,
                    type: DATE,

                },
                date: {
                    allowNull: false,
                    type: DATE,
                },
                created_by: {
                    defaultValue: null,
                    allowNull: true,
                    type: INTEGER,

                }
            });

            await queryInterface.addConstraint('requisitions',
                {
                    fields: ['code'],
                    type: 'unique',
                    name: 'requisitions_code_key', // useful if using queryInterface.removeConstraint

                });
            await queryInterface.addConstraint('requisitions',
                {
                    fields: ['sender'],
                    type: 'foreign key',
                    name: 'requisitions_store_sender',
                    references: {
                        table: 'stores',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
            await queryInterface.addConstraint('requisitions',
                {
                    fields: ['recipient'],
                    type: 'foreign key',
                    name: 'requisitions_store_recipient',
                    references: {
                        table: 'stores',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });


            await queryInterface.addConstraint('requisition_details',
                {
                    fields: ['product'],
                    type: 'foreign key',
                    name: 'requisition_details_product_key', // useful if using queryInterface.removeConstraint
                    references: {
                        table: 'products',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
            await queryInterface.addConstraint('requisition_details',
                {
                    fields: ['code'],
                    type: 'foreign key',
                    name: 'requisition_details_code_key',
                    references: {
                        table: 'requisitions',
                        field: 'code',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('requisitions');
            await queryInterface.dropTable('requisition_details');

        }
    },
    {
        name: "20211125214835-addDescriptionToStores",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('stores', 'description',
                {
                    type: STRING,
                    allowNull: true,
                    defaultValue: ''
                })
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('stores', 'description')
        }
    },
    {
        name: "20220105074517-addReceiptSettings",
        async up({ context: queryInterface }) {
            await queryInterface.bulkInsert('settings', [
                {
                    name: 'tax_title',
                    module: 'System',
                    value: 'Local Sale Tax'
                },
                {
                    name: 'show_tax_on_receipt',
                    module: 'System',
                    value: 'yes'
                },
                {
                    name: 'receipt_show_credits',
                    module: 'System',
                    value: 'yes'
                },
                {
                    name: 'receipt_extra_info',
                    module: 'System',
                    value: ''
                },
                {
                    name: 'receipt_footer',
                    module: 'System',
                    value: ''
                },
            ]
                );
        },
        async down({ context: queryInterface }) {
            await queryInterface.bulkDelete('settings',
                {
                    name: {
                        [Op.in]: ["tax_title",
                            "show_tax_on_receipt",
                            "receipt_show_credits",
                            "receipt_extra_info",
                            "receipt_footer"]
                    }
                })
        }
    },
    {
        name: "20220223095800-addMarkupToProducts",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('products', 'markup',
                {
                    type: DOUBLE,
                    defaultValue: 1.33
                })
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('products', 'markup')
        }
    },
    {
        name: "20220311134330-addActiveIngredient",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('products', 'active_ingredients',
                {
                    type: STRING,
                    defaultValue: null,
                    allowNull: true
                });
            await queryInterface.addColumn('products', 'drug_info',
                {
                    type: STRING,
                    defaultValue: null,
                    allowNull: true
                });
        },
        async down({ context: queryInterface }) {

            await queryInterface.removeColumn('products', 'active_ingredients');
            await queryInterface.removeColumn('products', 'drug_info');
        }
    },
    {
        name: "20220328084933-addExpiryToPurchaseDetails",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('purchase_details', 'expiry',
                {
                    type: STRING,
                    defaultValue: null,
                    allowNull: true
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('purchase_details', 'expiry');

        }
    },
    {
        name: "20220411095651-receiptSettings",
        async up({ context: queryInterface }) {
            await queryInterface.bulkInsert('settings', [
                {
                    name: 'receipt_show_customer',
                    module: 'System',
                    value: "yes"
                },
                {
                    name: 'receipt_product_data',
                    module: 'System',
                    value: ""
                },
                {
                    name: 'receipt_font_size',
                    module: 'System',
                    value: "13px"
                },
                {
                    name: 'receipt_show_borders',
                    module: 'System',
                    value: "yes"
                }
            ]);
        },
        async down({ context: queryInterface }) {
            await queryInterface.bulkDelete('settings',
                {
                    name: {
                        [Op.in]: ["receipt_show_customer",
                            "receipt_product_data",
                            "receipt_font_size",
                            "receipt_show_borders"]
                    }
                })
        }
    },
    {
        name: "20220503070044-updateSalesDetails",
        async up({ context: queryInterface }) {
            await queryInterface.addColumn('sales_details', 'expiry',
                {
                    type: STRING,
                    defaultValue: null,
                    allowNull: true
                });
            await queryInterface.addColumn('sales_details', 'unit',
                {
                    type: STRING,
                    defaultValue: null,
                    allowNull: true
                });
            await queryInterface.addColumn('sales_details', 'label',
                {
                    type: STRING,
                    defaultValue: null,
                    allowNull: true
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.removeColumn('sales_details', 'expiry');
            await queryInterface.removeColumn('sales_details', 'unit');
            await queryInterface.removeColumn('sales_details', 'label');

        }
    },
    {
        name: "20220506130046-addSalesPermissions",
        async up({ context: queryInterface }) {
            await queryInterface.bulkInsert('permissions', [{
                permission_id: '88',
                name: 'Edit Sales Prices',
                description: 'Allow user to change the price of items during sales'
            }]);

            await queryInterface.bulkInsert('role_permissions', [{
                permission_id: 88,
                role_id: 1
            }]);
        },
        async down({ context: queryInterface }) {
            await queryInterface.bulkDelete('permissions',
                {
                    permission_id: '88'
                });
            await queryInterface.bulkDelete('role_permissions',
                {
                    permission_id: '88'
                });
        }
    },
    {
        name: "20220524121539-multiplePaymentMethods",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('sales_payment_methods', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER,

                },

                code: {
                    allowNull: false,
                    type: STRING
                },
                payment_method: {
                    allowNull: false,
                    type: STRING
                },

                created_on: {
                    defaultValue: NOW,
                    allowNull: true,
                    type: DATE,

                },
                date: {
                    defaultValue: null,
                    allowNull: true,
                    type: DATE,

                },
                amount_paid: {
                    allowNull: false,
                    type: DOUBLE
                },
                transaction_id: {
                    allowNull: true,
                    defaultValue: null,
                    type: STRING
                }
            });



            await queryInterface.addIndex('sales_payment_methods',
                {
                    fields: ['payment_method'],

                });
            await queryInterface.addIndex('sales_payment_methods',
                {
                    fields: ['created_on'],

                });
            await queryInterface.addIndex('sales_payment_methods',
                {
                    fields: ['date'],

                });

            await queryInterface.addIndex('sales_payment_methods',
                {
                    fields: ['amount_paid'],

                });

            
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('sales_payment_methods')
        }
    },
    {
        name: "20220711162301-addDuplicateTimeoutSetting",
        async up({ context: queryInterface }) {
            await queryInterface.bulkInsert('settings', [
                {
                    name: 'duplicate_record_timeout',
                    module: 'System',
                    value: "10"
                }
            ]);
        },
        async down({ context: queryInterface }) {
            await queryInterface.bulkDelete('settings', {
                name: 'duplicate_record_timeout',
               
            })
        }
    },
    {
        name: "20221007120257-addReminderTable",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('reminders', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                type: {
                    type: STRING,
                    allowNull: false
                },
                dayOfWeek: {
                    allowNull: false,
                    type: STRING,
                    defaultValue: 'Monday'
                },
                hourOfDay: {
                    allowNull: false,
                    defaultValue: "9",
                    type: STRING
                },
                recipient: {
                    type: STRING,
                    allowNull: false
                },
                cc: {
                    type: STRING,
                    allowNull: null,
                    defaultValue: null
                }
            });

            //add the default data
            await queryInterface.bulkInsert('reminders', [
                {
                    'type': 'upcoming refills',
                    'dayOfWeek': 'Monday',
                    'hourOfDay': '10',
                    'recipient': 'none',
                    'cc': ''
                }
            ])
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('reminders')
        }
    },
    {
        name: "20221220113200-addCreatedOnToVariousTables",
        async up({ context: queryInterface }) {
            const tables = ["insurance_providers",
                "reminders", "role_permissions", "roles"];
            const transaction = await sequelize.transaction();
            try {
                for (let index = 0; index < tables.length; index++) {
                    const table = tables[index];
                    //check if the column exists first
                    const tableDescription = await queryInterface.describeTable(table);
                    if (!tableDescription.created_on) {
                        await queryInterface.addColumn(table, 'created_on',
                            {
                                defaultValue: NOW,
                                allowNull: true,
                                type: DATE,
                            }, {
                            transaction
                        });
                    }
                }
               
                transaction.commit();
            } catch (error) {
                transaction.rollback();
                throw new Error(error);

            }
            
            
            
        },
        async down({ context: queryInterface }) {
            const tables = ["insurance_providers", 
                "reminders", "role_permissions", "roles"];
            tables.forEach(async (table) => {
                await queryInterface.removeColumn(table, 'created_on')
            });

        }
    },
    {
        name: "20221220114600-addUpdatedAtToVariousTables",
        async up({ context: queryInterface }) {

            const transaction = await sequelize.transaction();
            try {
                for (let index = 0; index < models.length; index++) {
                    const model = models[index];
                    //check if the column exists first
                    let tableDescription = await queryInterface.describeTable(model.tableName);
                    
                    if (!tableDescription.updatedAt) {
                        await queryInterface.addColumn(model.tableName, 'updatedAt',
                            {
                                defaultValue: NOW,
                                allowNull: true,
                                type: DATE,
                            }, {
                            transaction
                        });
                    }
                }
                
                transaction.commit();
            } catch (error) {
                transaction.rollback();
                throw new Error(error);
                
            }


            
            
            

        },
        async down({ context: queryInterface }) {
            
            models.forEach(async (model) => {
                await queryInterface.removeColumn(model.tableName, 'updatedAt')
            });

        }
    },
    {
        name: "20221220151900-addObjectIdToActivities",
        async up({ context: queryInterface }) {
            const tableDescription = await queryInterface.describeTable("activities");
            if (!tableDescription.object_id) {
                await queryInterface.addColumn("activities", 'object_id',
                    {

                        type: STRING,
                    });
            }
            

        },
        async down({ context: queryInterface }) {

            await queryInterface.removeColumn("activities", 'object_id')

        }
    },
    {
        name: "20221221082200-addDeletedAtToAllTables",
        async up({ context: queryInterface }) {

            const transaction = await sequelize.transaction();
            try {
                for (let index = 0; index < models.length; index++) {
                    const model = models[index];
                    //check if the column does not exist first
                    let tableDescription = await queryInterface.describeTable(model.tableName);
                    if (!tableDescription.deletedAt) {
                        await queryInterface.addColumn(model.tableName, 'deletedAt',
                            {
                                allowNull: true,
                                type: DATE,
                            }, {
                            transaction
                        });
                    }
                }
                
                transaction.commit();
            } catch (error) {
                transaction.rollback();
                throw new Error(error);

            }

           
           
            

        },
        async down({ context: queryInterface }) {

            models.forEach(async (model) => {
                await queryInterface.removeColumn(model.tableName, 'deletedAt')
            });

        }
    }

]