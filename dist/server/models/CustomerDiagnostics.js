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
exports.CustomerDiagnostics = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Customers_1 = require("./Customers");
let CustomerDiagnostics = class CustomerDiagnostics extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Customers_1.Customers),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], CustomerDiagnostics.prototype, "customer", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CustomerDiagnostics.prototype, "test", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CustomerDiagnostics.prototype, "data", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CustomerDiagnostics.prototype, "comments", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CustomerDiagnostics.prototype, "date", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", String)
], CustomerDiagnostics.prototype, "created_on", void 0);
CustomerDiagnostics = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'customer_diagnostics',
        modelName: 'CustomerDiagnostics'
    })
], CustomerDiagnostics);
exports.CustomerDiagnostics = CustomerDiagnostics;
