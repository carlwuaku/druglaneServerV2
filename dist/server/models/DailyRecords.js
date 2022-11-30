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
exports.DailyRecords = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Users_1 = require("./Users");
let DailyRecords = class DailyRecords extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", String)
], DailyRecords.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "pos", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "cheque", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "insurance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "momo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "cash", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "other", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "credit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], DailyRecords.prototype, "shift", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Users_1.Users),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], DailyRecords.prototype, "created_by", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Number)
], DailyRecords.prototype, "created_on", void 0);
DailyRecords = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'daily_records',
        modelName: 'DailyRecords'
    })
], DailyRecords);
exports.DailyRecords = DailyRecords;
