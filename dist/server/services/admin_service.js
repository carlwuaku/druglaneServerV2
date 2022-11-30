"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../models/Users");
const roles_1 = require("../models/roles");
const Settings_1 = require("../models/Settings");
const Activities_1 = require("../models/Activities");
const UserSessions_1 = require("../models/UserSessions");
// const path = require('path')
// const ActivitiesHelper = require('../helpers/activitiesHelper');
// const AdminHelper = require('../helpers/adminHelper');
// // const { default: rebuild } = require('electron-rebuild');
// const helper = new AdminHelper();
// const activitiesHelper = new ActivitiesHelper()
// const CustomerHelper = require('../helpers/customerHelper.js');
// const customerHelper = new CustomerHelper();
const log = require('electron-log');
/**
 * Verify a username and password and log the user in if correct
 * @param {ReturnData} data the object containing data. typically will be _data or _data
 */
exports.login_function = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        var bcrypt = require('bcryptjs');
        var username = data.username;
        var password = data.password;
        try {
            let user = yield Users_1.Users.findOne({
                where: {
                    username: username,
                },
                include: [roles_1.Roles]
            });
            let password_valid = false;
            if (user != null) {
                //username was found. compare the password
                password_valid = bcrypt.compareSync(password, user.password_hash);
            }
            if (user == null || !password_valid) {
                return {
                    status: 0,
                    user_data: {},
                    data: null,
                    message: "User not found"
                };
            }
            //user is valid
            const now = new Date();
            var hash = bcrypt.hashSync(username + now, 10);
            let expires = now.getDate() + 3;
            var session_obj = { user_id: user.id, token: `'${hash}'`, expires: `'${expires}'` };
            UserSessions_1.UserSessions.create(session_obj);
            user.token = hash;
            user.role = user.role_id;
            // user.permissions = await helper.getRolePermissions(user.role_id, 'strings');
            let settings = yield Settings_1.Settings.findAll();
            user.type = "staff";
            yield Activities_1.Activities.create({
                activity: 'logged in',
                user_id: user.id,
                module: 'System'
            });
            return { status: 1, user_data: user,
                message: 'login successful', data: { settings } };
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
