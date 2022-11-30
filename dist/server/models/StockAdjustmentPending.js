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
exports.StockAdjustmentPending = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const products_1 = require("./products");
const Users_1 = require("./Users");
let StockAdjustmentPending = class StockAdjustmentPending extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => products_1.Products),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], StockAdjustmentPending.prototype, "product", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], StockAdjustmentPending.prototype, "quantity_counted", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], StockAdjustmentPending.prototype, "quantity_expected", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], StockAdjustmentPending.prototype, "current_price", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Users_1.Users),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], StockAdjustmentPending.prototype, "created_by", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "code", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "created_on", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "size", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "expiry", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "comments", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], StockAdjustmentPending.prototype, "quantity_expired", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], StockAdjustmentPending.prototype, "quantity_damaged", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "shelf", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], StockAdjustmentPending.prototype, "unit", void 0);
StockAdjustmentPending = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "stock_adjustment_pending",
        modelName: 'StockAdjustmentPending'
    })
], StockAdjustmentPending);
exports.StockAdjustmentPending = StockAdjustmentPending;
