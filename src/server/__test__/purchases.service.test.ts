import { Products } from "../models/Products";
import { runMigrations } from "../config/migrations/migrations";
import { sampleProducts } from "./sample_products";
import { find, save } from "../services/purchase.service";
import { Vendors } from "../models/Vendors";
import { Purchases } from "../models/Purchases";
import { StockAdjustment } from "../models/StockAdjustment";
import { PurchaseDetails } from "../models/PurchaseDetails";
import { SalesDetails } from "../models/SalesDetails";
import { TransferDetails } from "../models/TransferDetails";
import { ReceivedTransferDetails } from "../models/ReceivedTransferDetails";
import { StockAdjustmentPending } from "../models/StockAdjustmentPending";
import { calculateCurrentStock } from "../helpers/productsHelper";

describe('Puchase Service', () => {
    let addedCode = "";
    beforeAll(async () => {
        
         await runMigrations();
        //add some products and purchases
        await PurchaseDetails.destroy({ truncate: true, force: true });
        await SalesDetails.destroy({ truncate: true, force: true });
        await TransferDetails.destroy({ truncate: true, force: true });
        await ReceivedTransferDetails.destroy({ truncate: true, force: true });
        await StockAdjustmentPending.destroy({ truncate: true, force: true });
        await StockAdjustment.destroy({ truncate: true, force: true });
        await Purchases.destroy({ force: true, truncate: true });

        await Products.destroy({ force: true, truncate: true });
        await Vendors.destroy({ force: true, truncate: true });

        await Products.bulkCreate(sampleProducts);
        await Vendors.bulkCreate([
            { id: 1, name: 'vendor 1', phone: '1234' },
            { id: 2, name: 'vendor 2', phone: '1235' }
        ]);
        
    });

    test('creates  a purchase', async () => {
        
       
        let product1Stock = await calculateCurrentStock(1);
        let product2Stock = await calculateCurrentStock(2)
        let product5Stock = await calculateCurrentStock(5)
        addedCode = await save({
            date: '2023-03-19',
            created_by: '1',
            invoice: '123',
            vendor: '1',
            items: `[
                {
                    "product": 1,
                    "created_by": 1,
                    "price": 3,
                    "quantity": 9,
                    "selling_price": 4,
                    "unit": "tablet",
                    "markup": 1.3,
                    "expiry": "2024-01-02"
                },
                {
                    "product": 2,
                    "created_by": 1,
                    "price": 5,
                    "quantity": 20,
                    "selling_price": 7,
                    "unit": "tablet",
                    "markup": 1.3,
                    "expiry": "2024-01-02"
                },
                {
                    "product": 5,
                    "created_by": 1,
                    "price": 20,
                    "quantity": 50,
                    "selling_price": 30,
                    "unit": "strip",
                    "markup": 1.5,
                    "expiry": "2025-01-02"
                }
            ]`,
            user_id: 1
        });
        const purchaseObject = await Purchases.findOne({
            where: { code: addedCode }
        });
        expect(purchaseObject).toBeInstanceOf(Purchases);
        const details = await PurchaseDetails.findAll({
            where: { code: addedCode }
        })
        expect(details).toHaveLength(3)
        //check the products, make sure their details have
        //updated, stocks have updated
        let updated_product1 = await Products.findByPk(1);
        let updated_product2 = await Products.findByPk(2);
        let updated_product5 = await Products.findByPk(5);
        expect(updated_product1.current_stock).toEqual(product1Stock + 9);
        expect(updated_product2.current_stock).toEqual(product2Stock + 20);
        expect(updated_product5.current_stock).toEqual(product5Stock + 50);
        expect(updated_product1.price).toEqual(4);
        expect(updated_product2.price).toEqual(7);
        expect(updated_product5.price).toEqual(30);

    });
        
    test('edits  a purchase', async () => {


        let product1Stock = await calculateCurrentStock(1);
        let product2Stock = await calculateCurrentStock(2)
        let product5Stock = await calculateCurrentStock(5);
        let product7Stock = await calculateCurrentStock(7)
        let product9Stock = await calculateCurrentStock(9);
        let product10Stock = await calculateCurrentStock(10);
        //we'll remove 2 items from the previously saved purchase and add 3 items
        await save({
            date: '2023-03-19',
            code: addedCode,
            created_by: '1',
            invoice: '123',
            vendor: '1',
            items: `[
                {
                    "product": 1,
                    "created_by": 1,
                    "price": 3,
                    "quantity": 9,
                    "selling_price": 4,
                    "unit": "tablet",
                    "markup": 1.3,
                    "expiry": "2024-01-02"
                },
                {
                    "product": 10,
                    "created_by": 1,
                    "price": 3.5,
                    "quantity": 12,
                    "selling_price": 5,
                    "unit": "tablet",
                    "markup": 1.3,
                    "expiry": "2024-01-02"
                },
                {
                    "product": 7,
                    "created_by": 1,
                    "price": 200,
                    "quantity": 58,
                    "selling_price": 300,
                    "unit": "strip",
                    "markup": 1.5,
                    "expiry": "2025-01-02"
                },
                {
                    "product": 9,
                    "created_by": 1,
                    "price": 2,
                    "quantity": 8,
                    "selling_price": 3,
                    "unit": "strip",
                    "markup": 1.5,
                    "expiry": "2025-01-02"
                }
            ]`,
            user_id: 1
        });
        const purchaseObject = await Purchases.findOne({
            where: { code: addedCode }
        });
        expect(purchaseObject).toBeInstanceOf(Purchases);
        const details = await PurchaseDetails.findAll({
            where: { code: addedCode }
        })
        expect(details).toHaveLength(4)
        //check the products, make sure their details have
        //updated, stocks have updated
        let updated_product1 = await Products.findByPk(1);
        let updated_product2 = await Products.findByPk(2);
        let updated_product5 = await Products.findByPk(5);
        let updated_product7 = await Products.findByPk(7);
        let updated_product9 = await Products.findByPk(9);
        let updated_product10 = await Products.findByPk(10);
        //at the end of it, the one that wasnt changed whould remain the same
        expect(updated_product1.current_stock).toEqual(product1Stock);
        //the ones that were removed should have their qantities reduced by their previous quantities
        expect(updated_product2.current_stock).toEqual(product2Stock - 20);
        expect(updated_product5.current_stock).toEqual(product5Stock - 50);

        expect(updated_product7.current_stock).toEqual(product7Stock + 200);
        expect(updated_product9.current_stock).toEqual(product9Stock + 8);
        expect(updated_product10.current_stock).toEqual(product10Stock + 12);

        expect(updated_product7.price).toEqual(300);
        expect(updated_product9.price).toEqual(3);
        expect(updated_product10.price).toEqual(5);

    });
        
})
//when editing a eceipt, test for products that have been removed, making sure their stocks are updated 
//correctly