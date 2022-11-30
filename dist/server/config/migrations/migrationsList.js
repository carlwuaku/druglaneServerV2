"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationsList = void 0;
const sequelize_1 = require("sequelize");
exports.migrationsList = [
    {
        name: "20210314155622-addCustomerDob",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('customers', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER
                    },
                    name: {
                        type: sequelize_1.STRING
                    },
                    sex: {
                        type: sequelize_1.DATE
                    },
                    phone: {
                        type: sequelize_1.STRING
                    },
                    email: {
                        type: sequelize_1.INTEGER
                    },
                });
                yield queryInterface.addColumn('customers', 'date_of_birth', {
                    type: sequelize_1.DATE
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('customers');
            });
        }
    },
    {
        name: "20210314180101-create-product-batches",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('ProductBatches', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER
                    },
                    batch_number: {
                        type: sequelize_1.STRING
                    },
                    expiry: {
                        type: sequelize_1.DATE
                    },
                    barcode: {
                        type: sequelize_1.STRING
                    },
                    product: {
                        type: sequelize_1.INTEGER
                    },
                    purchase_code: {
                        type: sequelize_1.STRING
                    },
                    createdAt: {
                        allowNull: true,
                        type: sequelize_1.DATE,
                    },
                    updatedAt: {
                        allowNull: true,
                        type: sequelize_1.DATE
                    }
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('ProductBatches');
            });
        }
    },
    {
        name: "20210315154011-addQuantityToProductBatches",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('productbatches', 'quantity', {
                    type: sequelize_1.DOUBLE
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('productbatches', 'quantity');
            });
        }
    },
    {
        name: "20210317181610-addQuantitySoldToproductBatches",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('productbatches', 'quantity_sold', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('productbatches', 'quantity_sold');
            });
        }
    },
    {
        name: "20210324143037-create-daily-records",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('dailyRecords', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER,
                    },
                    date: {
                        type: sequelize_1.DATE
                    }, amount: {
                        type: sequelize_1.DOUBLE
                    }, shift: {
                        type: sequelize_1.STRING
                    }, created_by: {
                        type: sequelize_1.INTEGER
                    },
                    created_on: {
                        defaultValue: sequelize_1.NOW,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    }
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('dailyRecords');
            });
        }
    },
    {
        name: "20210324173726-addPaymentMethodsToDailyRecords",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('dailyRecords', 'cash', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
                yield queryInterface.addColumn('dailyRecords', 'momo', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
                yield queryInterface.addColumn('dailyRecords', 'insurance', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
                yield queryInterface.addColumn('dailyRecords', 'credit', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
                yield queryInterface.addColumn('dailyRecords', 'pos', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
                yield queryInterface.addColumn('dailyRecords', 'cheque', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
                yield queryInterface.addColumn('dailyRecords', 'other', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('dailyRecords', 'cash');
                yield queryInterface.removeColumn('dailyRecords', 'momo');
                yield queryInterface.removeColumn('dailyRecords', 'insurance');
                yield queryInterface.removeColumn('dailyRecords', 'credit');
                yield queryInterface.removeColumn('dailyRecords', 'pos');
                yield queryInterface.removeColumn('dailyRecords', 'cheque');
                yield queryInterface.removeColumn('dailyRecords', 'other');
            });
        }
    },
    {
        name: "20210409084451-createSalesBatches",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('sales_batches', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER,
                    },
                    date: {
                        type: sequelize_1.DATE
                    },
                    batch_number: {
                        type: sequelize_1.STRING
                    },
                    product: {
                        type: sequelize_1.INTEGER
                    },
                    quantity: {
                        type: sequelize_1.DOUBLE
                    },
                    code: {
                        type: sequelize_1.STRING
                    }, created_by: {
                        type: sequelize_1.INTEGER
                    },
                    created_on: {
                        defaultValue: sequelize_1.NOW,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    }
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('sales_batches');
            });
        }
    },
    {
        name: "20210409085254-addExpiryToSalesBatches",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('sales_batches', 'expiry', {
                    type: sequelize_1.DATE
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('sales_batches', 'expiry');
            });
        }
    },
    {
        name: "20210409095027-addPreferredVendorToProducts",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('products', 'preferred_vendor', {
                    type: sequelize_1.INTEGER
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('products', 'preferred_vendor');
            });
        }
    },
    {
        name: "20210626115902-createTokensTable",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('tokens', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER,
                    },
                    name: {
                        type: sequelize_1.STRING
                    },
                    token: {
                        type: sequelize_1.STRING
                    },
                    created_on: {
                        defaultValue: sequelize_1.NOW,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    }
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('tokens`');
            });
        }
    },
    {
        name: "20210824173831-addOnlineToUsers",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('users', 'allow_online', {
                    type: sequelize_1.STRING,
                    defaultValue: 'no'
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('users', 'allow_online');
            });
        }
    },
    {
        name: "20210926105345-updateProductsTable",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
            });
        }
    },
    {
        name: "20211023131213-insertTaxSetting",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkInsert('settings', [{
                        name: 'tax',
                        module: 'System',
                        value: '0'
                    }], {
                // ignoreDuplicates: true
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkDelete('settings', {
                    name: 'tax'
                });
            });
        }
    },
    {
        name: "20211023134920-addTaxToSales",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('sales', 'tax', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 0
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('sales', 'tax');
            });
        }
    },
    {
        name: "20211024133528-insertBatchSetting",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                const queryOptions = {};
                yield queryInterface.bulkInsert('settings', [{
                        name: 'activate_batch_mode',
                        module: 'System',
                        value: 'no'
                    }], {});
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkDelete('settings', {
                    name: 'activate_batch_mode'
                });
            });
        }
    },
    {
        name: "20211109143824-addLogoToSettings",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                // const logo_exists = await Settings.findAll({
                //     where: {
                //         name: { [Op.in]: ['logo','receipt_logo']}
                //     }
                // })
                // console.log("logo exists",logo_exists)
                const data = [{
                        name: 'logo',
                        module: 'System',
                        value: ''
                    },
                    {
                        name: 'receipt_logo',
                        module: 'System',
                        value: 'no'
                    }];
                yield queryInterface.bulkInsert('settings', data);
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkDelete('settings', {
                    name: {
                        [sequelize_1.Op.in]: ['logo',
                            'receipt_logo']
                    }
                });
            });
        }
    },
    {
        name: "20211121152934-productsAddDrugInfo",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('products', 'is_drug', {
                    type: sequelize_1.STRING,
                    defaultValue: 'yes'
                });
                yield queryInterface.addColumn('products', 'generic_name', {
                    allowNull: true,
                    type: sequelize_1.STRING,
                    defaultValue: null
                });
                yield queryInterface.addColumn('products', 'contraindications', {
                    allowNull: true,
                    type: sequelize_1.STRING,
                    defaultValue: null
                });
                yield queryInterface.addColumn('products', 'pregnancy', {
                    allowNull: true,
                    type: sequelize_1.STRING,
                    defaultValue: null
                });
                yield queryInterface.addColumn('products', 'side_effects', {
                    allowNull: true,
                    type: sequelize_1.STRING,
                    defaultValue: null
                });
                yield queryInterface.addColumn('products', 'caution', {
                    allowNull: true,
                    type: sequelize_1.STRING,
                    defaultValue: null
                });
                yield queryInterface.addColumn('products', 'indications', {
                    allowNull: true,
                    type: sequelize_1.STRING,
                    defaultValue: null
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('products', 'is_drug');
                yield queryInterface.removeColumn('products', 'generic_name');
                yield queryInterface.removeColumn('products', 'contraindications');
                yield queryInterface.removeColumn('products', 'pregnancy');
                yield queryInterface.removeColumn('products', 'side_effects');
                yield queryInterface.removeColumn('products', 'caution');
                yield queryInterface.removeColumn('products', 'indications');
            });
        }
    },
    {
        name: "20211121154018-addStoresTables",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('stores', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER,
                    },
                    name: {
                        type: sequelize_1.STRING
                    },
                    created_on: {
                        defaultValue: sequelize_1.NOW,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    }
                });
                yield queryInterface.createTable('store_inventory', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER,
                    },
                    product: {
                        type: sequelize_1.INTEGER,
                    },
                    store: {
                        type: sequelize_1.INTEGER,
                    },
                    max_stock: {
                        type: sequelize_1.DOUBLE
                    },
                    min_stock: {
                        type: sequelize_1.DOUBLE
                    },
                    current_stock: {
                        type: sequelize_1.DOUBLE
                    },
                    expiry: {
                        type: sequelize_1.DATE
                    },
                    created_on: {
                        defaultValue: sequelize_1.NOW,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    }
                });
                yield queryInterface.addConstraint('store_inventory', {
                    fields: ['product'],
                    type: 'foreign key',
                    name: 'products_storeInventory_product',
                    references: {
                        table: 'products',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
                yield queryInterface.addConstraint('store_inventory', {
                    fields: ['store'],
                    type: 'foreign key',
                    name: 'products_storeInventory_store',
                    references: {
                        table: 'stores',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('stores');
                yield queryInterface.dropTable('store_inventory');
            });
        }
    },
    {
        name: "20211121170321-addRequisitionTables",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('requisitions', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER,
                    },
                    code: {
                        allowNull: false,
                        type: sequelize_1.STRING
                    },
                    sender: {
                        allowNull: false,
                        type: sequelize_1.INTEGER
                    },
                    recipient: {
                        allowNull: false,
                        type: sequelize_1.INTEGER
                    },
                    created_on: {
                        defaultValue: sequelize_1.NOW,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    },
                    created_by: {
                        defaultValue: null,
                        allowNull: true,
                        type: sequelize_1.INTEGER,
                    }, status: {
                        allowNull: false,
                        defaultValue: 'Pending',
                        type: sequelize_1.STRING
                    }
                });
                yield queryInterface.createTable('requisition_details', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER,
                    },
                    product: {
                        type: sequelize_1.INTEGER,
                    },
                    code: {
                        type: sequelize_1.STRING,
                    },
                    price: {
                        type: sequelize_1.DOUBLE
                    },
                    cost_price: {
                        type: sequelize_1.DOUBLE
                    },
                    quantity: {
                        type: sequelize_1.DOUBLE
                    },
                    expiry: {
                        type: sequelize_1.DATE
                    },
                    created_on: {
                        defaultValue: sequelize_1.NOW,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    },
                    date: {
                        allowNull: false,
                        type: sequelize_1.DATE,
                    },
                    created_by: {
                        defaultValue: null,
                        allowNull: true,
                        type: sequelize_1.INTEGER,
                    }
                });
                yield queryInterface.addConstraint('requisitions', {
                    fields: ['code'],
                    type: 'unique',
                    name: 'requisitions_code_key', // useful if using queryInterface.removeConstraint
                });
                yield queryInterface.addConstraint('requisitions', {
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
                yield queryInterface.addConstraint('requisitions', {
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
                yield queryInterface.addConstraint('requisition_details', {
                    fields: ['product'],
                    type: 'foreign key',
                    name: 'requisition_details_product_key',
                    references: {
                        table: 'products',
                        field: 'id',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
                yield queryInterface.addConstraint('requisition_details', {
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
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('requisitions');
                yield queryInterface.dropTable('requisition_details');
            });
        }
    },
    {
        name: "20211125214835-addDescriptionToStores",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('stores', 'description', {
                    type: sequelize_1.STRING,
                    allowNull: true,
                    defaultValue: ''
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('stores', 'description');
            });
        }
    },
    {
        name: "20220105074517-addReceiptSettings",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkInsert('settings', [
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
                ]);
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkDelete('settings', {
                    name: {
                        [sequelize_1.Op.in]: ["tax_title",
                            "show_tax_on_receipt",
                            "receipt_show_credits",
                            "receipt_extra_info",
                            "receipt_footer"]
                    }
                });
            });
        }
    },
    {
        name: "20220223095800-addMarkupToProducts",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('products', 'markup', {
                    type: sequelize_1.DOUBLE,
                    defaultValue: 1.33
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('products', 'markup');
            });
        }
    },
    {
        name: "20220311134330-addActiveIngredient",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('products', 'active_ingredients', {
                    type: sequelize_1.STRING,
                    defaultValue: null,
                    allowNull: true
                });
                yield queryInterface.addColumn('products', 'drug_info', {
                    type: sequelize_1.STRING,
                    defaultValue: null,
                    allowNull: true
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('products', 'active_ingredients');
                yield queryInterface.removeColumn('products', 'drug_info');
            });
        }
    },
    {
        name: "20220328084933-addExpiryToPurchaseDetails",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('purchase_details', 'expiry', {
                    type: sequelize_1.STRING,
                    defaultValue: null,
                    allowNull: true
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('purchase_details', 'expiry');
            });
        }
    },
    {
        name: "20220411095651-receiptSettings",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkInsert('settings', [
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
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkDelete('settings', {
                    name: {
                        [sequelize_1.Op.in]: ["receipt_show_customer",
                            "receipt_product_data",
                            "receipt_font_size",
                            "receipt_show_borders"]
                    }
                });
            });
        }
    },
    {
        name: "20220503070044-updateSalesDetails",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.addColumn('sales_details', 'expiry', {
                    type: sequelize_1.STRING,
                    defaultValue: null,
                    allowNull: true
                });
                yield queryInterface.addColumn('sales_details', 'unit', {
                    type: sequelize_1.STRING,
                    defaultValue: null,
                    allowNull: true
                });
                yield queryInterface.addColumn('sales_details', 'label', {
                    type: sequelize_1.STRING,
                    defaultValue: null,
                    allowNull: true
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.removeColumn('sales_details', 'expiry');
                yield queryInterface.removeColumn('sales_details', 'unit');
                yield queryInterface.removeColumn('sales_details', 'label');
            });
        }
    },
    {
        name: "20220506130046-addSalesPermissions",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkInsert('permissions', [{
                        permission_id: '88',
                        name: 'Edit Sales Prices',
                        description: 'Allow user to change the price of items during sales'
                    }]);
                yield queryInterface.bulkInsert('role_permissions', [{
                        permission_id: 88,
                        role_id: 1
                    }]);
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkDelete('permissions', {
                    permission_id: '88'
                });
                yield queryInterface.bulkDelete('role_permissions', {
                    permission_id: '88'
                });
            });
        }
    },
    {
        name: "20220524121539-multiplePaymentMethods",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('sales_payment_methods', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER,
                    },
                    code: {
                        allowNull: false,
                        type: sequelize_1.STRING
                    },
                    payment_method: {
                        allowNull: false,
                        type: sequelize_1.STRING
                    },
                    created_on: {
                        defaultValue: sequelize_1.NOW,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    },
                    date: {
                        defaultValue: null,
                        allowNull: true,
                        type: sequelize_1.DATE,
                    },
                    amount_paid: {
                        allowNull: false,
                        type: sequelize_1.DOUBLE
                    },
                    transaction_id: {
                        allowNull: true,
                        defaultValue: null,
                        type: sequelize_1.STRING
                    }
                });
                yield queryInterface.addIndex('sales_payment_methods', {
                    fields: ['payment_method'],
                });
                yield queryInterface.addIndex('sales_payment_methods', {
                    fields: ['created_on'],
                });
                yield queryInterface.addIndex('sales_payment_methods', {
                    fields: ['date'],
                });
                yield queryInterface.addIndex('sales_payment_methods', {
                    fields: ['amount_paid'],
                });
                yield queryInterface.addConstraint('sales_payment_methods', {
                    fields: ['code'],
                    type: 'foreign key',
                    name: 'sales_payment_methods_code_key',
                    references: {
                        table: 'sales',
                        field: 'code',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('sales_payment_methods');
            });
        }
    },
    {
        name: "20220711162301-addDuplicateTimeoutSetting",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkInsert('settings', [
                    {
                        name: 'duplicate_record_timeout',
                        module: 'System',
                        value: "10"
                    }
                ]);
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.bulkDelete('settings', {
                    name: 'duplicate_record_timeout',
                });
            });
        }
    },
    {
        name: "20221007120257-addReminderTable",
        up({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.createTable('reminders', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: sequelize_1.INTEGER
                    },
                    type: {
                        type: sequelize_1.STRING,
                        allowNull: false
                    },
                    dayOfWeek: {
                        allowNull: false,
                        type: sequelize_1.STRING,
                        defaultValue: 'Monday'
                    },
                    hourOfDay: {
                        allowNull: false,
                        defaultValue: "9",
                        type: sequelize_1.STRING
                    },
                    recipient: {
                        type: sequelize_1.STRING,
                        allowNull: false
                    },
                    cc: {
                        type: sequelize_1.STRING,
                        allowNull: null,
                        defaultValue: null
                    }
                });
                //add the default data
                yield queryInterface.bulkInsert('reminders', [
                    {
                        'type': 'upcoming refills',
                        'dayOfWeek': 'Monday',
                        'hourOfDay': '10',
                        'recipient': 'none',
                        'cc': ''
                    }
                ]);
            });
        },
        down({ context: queryInterface }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable('reminders');
            });
        }
    }
];
