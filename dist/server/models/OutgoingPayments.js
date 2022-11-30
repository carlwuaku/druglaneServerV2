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
exports.OutgoingPayments = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Users_1 = require("./Users");
let OutgoingPayments = class OutgoingPayments extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", String)
], OutgoingPayments.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false
    }),
    __metadata("design:type", Number)
], OutgoingPayments.prototype, "amount", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OutgoingPayments.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OutgoingPayments.prototype, "recipient", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OutgoingPayments.prototype, "transaction_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OutgoingPayments.prototype, "item_code", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OutgoingPayments.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Users_1.Users),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], OutgoingPayments.prototype, "created_by", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", String)
], OutgoingPayments.prototype, "created_on", void 0);
OutgoingPayments = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'outgoing_payments',
        modelName: 'OutgoingPayments'
    })
], OutgoingPayments);
exports.OutgoingPayments = OutgoingPayments;
