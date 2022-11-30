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
exports.Customers = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CustomerDiagnostics_1 = require("./CustomerDiagnostics");
let Customers = class Customers extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customers.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customers.prototype, "sex", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customers.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customers.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customers.prototype, "date_of_birth", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", String)
], Customers.prototype, "created_on", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customers.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => CustomerDiagnostics_1.CustomerDiagnostics),
    __metadata("design:type", Array)
], Customers.prototype, "customerDiagnostics", void 0);
Customers = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'customers',
        modelName: 'Customers'
    })
], Customers);
exports.Customers = Customers;
