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
exports.RolePermissions = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const permissions_1 = require("./permissions");
const roles_1 = require("./roles");
let RolePermissions = class RolePermissions extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => roles_1.Roles),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], RolePermissions.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => permissions_1.Permissions),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], RolePermissions.prototype, "permission_id", void 0);
RolePermissions = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'role_permissions',
        modelName: 'RolePermissions'
    })
], RolePermissions);
exports.RolePermissions = RolePermissions;
// const {
//   Model
// } = require('sequelize');
// const Roles = require("./roles");
// const Permissions = require("./permissions")
// module.exports = (sequelize, DataTypes) => {
//   class role_permissions extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   role_permissions.init({
//     role_id: {type: DataTypes.INTEGER
//     },
//     permission_id: {type: DataTypes.INTEGER
//     }
//   }, {
//     sequelize,
//     modelName: 'role_permissions',
//   });
//   return role_permissions;
// };
