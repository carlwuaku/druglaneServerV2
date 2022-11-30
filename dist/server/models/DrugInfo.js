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
exports.DrugInfo = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let DrugInfo = class DrugInfo extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "pregnancy", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "pharmacodynamics", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "indications_and_usage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "contraindications", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "drug_interactions_table", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "warnings_and_cautions", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "dosage_and_administration", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "adverse_reactions", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "information_for_patients", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "clinical_pharmacology", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "drug_abuse_and_dependence", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "teratogenic_effects", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "geriatric_use", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DrugInfo.prototype, "overdosage", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", String)
], DrugInfo.prototype, "created_on", void 0);
DrugInfo = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'drug_info',
        modelName: 'DrugInfo'
    })
], DrugInfo);
exports.DrugInfo = DrugInfo;
