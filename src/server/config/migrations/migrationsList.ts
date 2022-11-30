import { InputMigrations } from "umzug";
import { STRING, INTEGER, DATE, DOUBLE, NOW, Op, QueryInterface, QueryOptions } from 'sequelize';


export const migrationsList: InputMigrations<QueryInterface> = [
    {
        name: "20210314155622-addCustomerDob",
        async up({ context: queryInterface }) {
            await queryInterface.createTable('customers', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: INTEGER
                },
                name: {
                    type: STRING
                },
                sex: {
                    type: DATE
                },
                phone: {
                    type: STRING
                },
                email: {
                    type: INTEGER
                },
            })
            await queryInterface.addColumn('customers', 'date_of_birth',
                {
                    type: DATE
                });
        },
        async down({ context: queryInterface }) {
            await queryInterface.dropTable('customers');
 
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

            await queryInterface.addConstraint('sales_payment_methods',
                {
                    fields: ['code'],
                    type: 'foreign key',
                    name: 'sales_payment_methods_code_key', // useful if using queryInterface.removeConstraint
                    references: {
                        table: 'sales',
                        field: 'code',
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
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
    }

]