/**
 * This contains the logic for all the functionalities in the staffcontroller. also used in the 
 * firebase functions. all functions must be async, and throw errors if necessary
 */
import { constants } from '../../constants'
import path from 'path';
import { Users } from '../models/Users';
import { Roles } from '../models/roles';
import { Settings } from '../models/Settings';
import { Activities } from '../models/Activities';
import { Branches } from '../models/Branches';
import { UserSessions } from '../models/UserSessions';
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
exports.login_function = async function (data: { username: any; password: any; }): Promise<ReturnData> {
    var bcrypt = require('bcryptjs');
    var username = data.username;
    var password = data.password;
    try {

        let user = await Users.findOne({
            where: {
                username: username,
            },
            include: [Roles]
        });
        let password_valid: boolean = false;
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
            }
        }
        //user is valid

        const now = new Date();
        var hash = bcrypt.hashSync(username + now, 10);
        let expires = now.getDate() + 3;
        var session_obj = { user_id: user.id, token: `'${hash}'`, expires: `'${expires}'` }
        UserSessions.create(session_obj)
        
        user.token = hash;
        user.role = user.role_id;
        // user.permissions = await helper.getRolePermissions(user.role_id, 'strings');
        let settings = await Settings.findAll();
        

        user.type = "staff";
        await Activities.create({
            activity: 'logged in',
            user_id: user.id,
            module: 'System'
        })

        return { status: 1, user_data: user, 
            message: 'login successful', data: {settings} }
    } catch (error) {
        throw new Error(error)

    }
}





