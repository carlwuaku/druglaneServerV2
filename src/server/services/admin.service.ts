/**
 * This contains the logic for all the functionalities in the staffcontroller. also used in the 
 * firebase functions. all functions must be async, and throw errors if necessary
 */
import { constants } from '../constants'
import path from 'path';
import { Users } from '../models/Users';
import { Roles } from '../models/Roles';
import { Settings } from '../models/Settings';
import { Activities } from '../models/Activities';
import { Branches } from '../models/Branches';
import { UserSessions } from '../models/UserSessions';
import { logger } from '../config/logger'
import { InsuranceProviders } from '../models/InsuranceProviders';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs'
// const path = require('path')

// const ActivitiesHelper = require('../helpers/activitiesHelper');

// const AdminHelper = require('../helpers/adminHelper');
// // const { default: rebuild } = require('electron-rebuild');
// const helper = new AdminHelper();
// const activitiesHelper = new ActivitiesHelper()

// const CustomerHelper = require('../helpers/customerHelper.js');
// const customerHelper = new CustomerHelper();



/**
 * Verify a username and password and log the user in if correct
 * @param {ReturnData} data the object containing data. typically will be _data or _data
 */
export async function login_function(data: { username: any; password: any; }): Promise<Users> {
    let username = data.username;
    let password = data.password;
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
            throw new Error("User not found")

        }
        //user is valid

        const now = new Date();
        let hash = bcrypt.hashSync(username + now, 10);
        let expires = now.getDate() + 3;
        let session_obj = { user_id: user.id, token: `${hash}`, expires: `${expires}` }
        UserSessions.create(session_obj)

        user.token = hash;
        user.role = user.role_id;
        // user.permissions = await helper.getRolePermissions(user.role_id, 'strings');
        // let settings = await Settings.findAll();


        user.type = "staff";
        await Activities.create({
            activity: 'logged in',
            user_id: user.id,
            module: 'System'
        })

        return user;
    } catch (error) {
        //if the error is "user not found", rethrow it. else if it's some other error, log it
        if (error instanceof Error) {
            logger.error(error)
            throw new Error(error.message)
        }
        else {
            throw new Error(error);

        }


    }
}


/**
 * get the branches of the facility
 * @returns {Object}
 */
export async function get_branches_function(): Promise<Branches[]> {
    try {
        let query = await Branches.findAll();
        return query;

    } catch (error) {
        logger.error(error)
        throw new Error("Error getting branches")
    }
}


/**
 * get the logo of the facility
 * @returns {Promise<ReturnData>}
 */
export async function get_logo_function(): Promise<string> {
    try {
        const fs = require('fs');
        let logo = await Settings.findOne({
            where: {
                'name': "logo"
            }
        });//null or string (filenam.jpg for instance)
        let extension = "jpg";
        let image = "";
        if (logo != null) {
            //get the extension. it will be the last item in the array if split by a dot (.)
            let split = logo.value.split(".");
            extension = split.pop();
            image = `data:image/${extension};base64,` + fs.readFileSync(path.join(constants.settings_location, logo.value), 'base64');

        }

        return image

    } catch (error) {
        logger.error(error)
        throw new Error("Error getting logo")
    }
}


/**
 * insert a new branch
 * @param {Object} _data object containing data
 * @returns {Object}
 */
export async function save_branch_function(_data: { name: any; phone: any; }): Promise<Branches> {
    try {
        let data = {
            name: `'${_data.name}'`,
            phone: `'${_data.phone}'`
        }
        let branch = await Branches.create(data)
        return branch;
    } catch (error) {
        logger.error(error)
        throw new Error("Error creating branch")
    }
}

/**
 * get all insurers
 * @returns {Promise<InsuranceProviders[]>} an array of InsuranceProviders
 */
export async function get_insurers_function(): Promise<InsuranceProviders[]> {
    try {
        let insurers = await InsuranceProviders.findAll();
        return insurers
    } catch (error) {
        logger.error(error)
        throw new Error("Error getting insurers")

    }
}



/**
 * add a new insurance provider
 * @param _data an object containing the name of the insurance provider
 */
export async function add_insurer_function(_data: { name: any; }): Promise<InsuranceProviders> {
    try {
        let data = { name: `'${_data.name}'` }
        let insuranceProvider = await InsuranceProviders.create(data);
        return insuranceProvider
    } catch (error) {
        logger.error(error)
        throw new Error("Error creating insurer")
    }
};

/**
 * soft delete an insuranceprovider
 * @param _data {id:string}
 * @returns {Promise<ReturnData>} 
 */
export async function delete_insurer_function(_data: { id: string; }): Promise<boolean> {
    //split the id or name into an array
    const ids = _data.id.split(",");
    try {
        //delete where name in (param) or id in para
        await InsuranceProviders.destroy({
            where: {
                [Op.or]: [
                    {
                        id: { [Op.in]: ids }
                    },
                    {
                        name: { [Op.in]: ids }
                    }
                ]
            }
        })
        return true
    } catch (error) {
        logger.error(error)
        throw new Error("Error deleting insurer")
    }
};

/**
 * 
 * @param _data {
    offset: number; limit: number;
    start_date: string; end_date: string;
}
 * @returns 
 */
export async function get_all_activities_function(_data: {
    offset: number; limit: number;
    start_date: string; end_date: string;
}): Promise<Activities[]> {
    let offset = _data.offset == undefined ? 0 : _data.offset;
    let limit = _data.limit == undefined ? 100 : _data.limit;
    let start = _data.start_date == undefined ? null : _data.start_date;
    let end = _data.end_date == undefined ? null : _data.end_date;

    try {
        let objects;
        if (start == null) {
            objects = await Activities.findAll(
                {
                    limit: limit,
                    offset: offset
                }
            );
        }
        else {
            objects = await Activities.findAll({
                where: {
                    created_on: {
                        [Op.and]: {
                            [Op.gte]: `${start} 00:00:00`,
                            [Op.lte]: `${end} 23:59:59`
                        }
                    },
                }
            })

        }

        // for (let  i = 0; i < objects.length; i++) {
        //     let  obj = objects[i];
        //     obj.user = await helper.getItem(` id = ${obj.user_id} `, helper.table_name)

        // }
        //console.log(objects)
        return objects
    } catch (error) {
        logger.error(error)
        throw new Error("Error getting activities")
    }

};


/**
 * get the list of activities related to some object
 * @param _data 
 * @returns a list of activities
 */
export async function get_activities_function(_data: { r: any; offset: any; limit: any; }): Promise<Activities[]> {
    let reg = _data.r;//this would be the id or unique identifier of an object
    let offset = _data.offset == undefined ? 0 : _data.offset;
    let limit = _data.limit == undefined ? null : _data.limit;
    try {
        let objects = await Activities.findAll({
            where: {
                object_id: reg
            },
            limit: limit,
            offset: offset,
            include: {
                model: Users,
                as: 'user'
            }
        })


        return objects
    } catch (error) {
        logger.error(error)
        throw new Error("Error getting Activities")
    }

};

/**
 * get the list of activities for a specified user
 * @param _data 
 * @returns {Promise<Activities[]>} a list of activities
 */
export async function get_user_activities_function(_data:
    { id: any; offset: number; limit: number; start_date?: string; end_date?: string; }): Promise<Activities[]> {
    let offset = _data.offset == undefined ? 0 : _data.offset;
    let limit = _data.limit == undefined ? 100 : _data.limit;

    let start = _data.start_date == undefined ? null : _data.start_date;
    let end = _data.end_date == undefined ? null : _data.end_date;

    try {
        let where: { [key: string]: any } = {
            user_id: _data.id
        };
        if (start != null) {
            where["created_on"] = {
                [Op.and]: {
                    [Op.gte]: `${start} 00:00:00`,
                    [Op.lte]: `${end} 23:59:59`
                }
            };
        }
        // let where = start == null ? `user_id = ${reg}` : ` user_id = ${reg} and created_on >= '${start} 00:00:00' and created_on <= '${end} 23:59:59'`;
        // let objects = await activitiesHelper.getMany(where, activitiesHelper.table_name, limit, offset);
        let objects = await Activities.findAll({
            where: where,
            limit: limit,
            offset: offset
        });

        // let total = await Activities.count({
        //     where: where
        // })
        // for (let  i = 0; i < objects.length; i++) {
        //     let  obj = objects[i];
        //     obj.user = await helper.getItem(` id = ${obj.user_id} `, helper.table_name)

        // }

        return objects
    } catch (error) {
        logger.error(error)
        throw new Error("Error getting Activities")
    }

};

/**
 * get the list of users
 * @param _data 
 * @returns {Promise<Users>} a list of users
 */
export async function get_users_function(_data: { limit: number, offset: number }): Promise<Users[]> {
    try {


        let objects = await Users.findAll({
            limit: _data.limit,
            offset: _data.offset,
            include: {
                model: Roles
            }
        });

        return objects
    } catch (error) {
        console.log(error)

        logger.error(error)
        throw new Error("Error getting users")
    }
};



/**
 * add a user to the database
 * @param _data 
 * @returns {Promise<Users>} an instance of the saved user  
 */
export async function save_user_function(_data: { [key: string]: any }): Promise<Users> {
    try {

        // let id = _data.id;
        let user = Users.build(_data)


        //update. else insert
        let password = _data.password;
        //console.log(password)
        if (password !== undefined && password !== null && password != "undefined") {
            let hash = bcrypt.hashSync(password, 10);
            // console.log(hash)
            user.password_hash = `${hash}`;
        }
        else {
            delete user.password_hash;
        }
        await user.save();




        return user
    } catch (error) {
        logger.error(error)
        throw new Error("Error adding a user")
    }





};


/**
 * soft delete a user
 * @param _data 
 * @returns {boolean} true if the user was actually deleted
 */
export async function delete_user_function(_data: { id: any; userid: any; }): Promise<boolean> {

    let id = _data.id;

    //console.log(id)
    try {
        let user = await Users.findOne({
            where: {
                id: id
            }
        })
        await user.destroy();
        await Activities.create({
            activity: `deleted user ${user.toJSON()}`,
            user_id: `${_data.userid}`,
            object_id: user.id,
            module: 'users'
        })
        return true
    } catch (error) {
        logger.error(error)
        throw new Error("Error creating user")
    }

};

/**
 * get a user object with the provided id
 * @param _data 
 * @returns {Promise<Users>} a user object 
 */
export async function get_user_function(_data: { id: any; }): Promise<Users> {
    try {
        let user = await Users.findOne({
            where: {
                id: _data.id
            }
        }
        );


        return user
    } catch (error) {
        console.log(error)
        logger.error(error)
        throw new Error("Error getting user")
    }

};





