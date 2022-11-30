"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Products = class Products extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "notes", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "unit", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "picture", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", String)
], Products.prototype, "created_on", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Products.prototype, "max_stock", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Products.prototype, "min_stock", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", String)
], Products.prototype, "expiry", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "barcode", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Products.prototype, "current_stock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", String)
], Products.prototype, "last_modified", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Products.prototype, "cost_price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "size", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 1
    }),
    __metadata("design:type", Number)
], Products.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "shelf", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Products.prototype, "preferred_vendor", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "is_drug", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "generic_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "contraindications", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "pregnancy", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "side_effects", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "caution", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "indications", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 1.33
    }),
    __metadata("design:type", Number)
], Products.prototype, "markup", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "active_ingredients", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Products.prototype, "drug_info", void 0);
Products = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'products',
        modelName: 'Products'
    })
], Products);
exports.Products = Products;
