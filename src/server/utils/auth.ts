import { Settings } from "../models/Settings";
import { NextFunction, Request, Response } from 'express';
import { Users } from "../models/Users";
import { get_role_permissions_function } from "../services/admin.service";
import { errorMessages, infoMessages, moduleNames } from '../helpers/stringHelpers'

export const isAdminLoggedIn = async (request: Request, response: Response, next: NextFunction) => {
    //get the admin_login_token setting from the settings table
    const setting = await Settings.findOne({
        where: {
            name: 'admin_login_token'
        }
    });
    //if nothing found, not logged in
    if (!setting) {
        response.status(500).json({ message: errorMessages.INCORRECT_SYSTEM_CONFIG });
    }
    //check if the headers are valid
    const userToken = request.headers['admin_token'];
    if (!userToken) {
        response.status(403).json({ message: errorMessages.INCORRECT_REQUEST_CONFIG });
    }
    else {
        if (userToken !== setting?.value) {
            response.status(403).json({ message: errorMessages.NOT_LOGGED_IN_AS_ADMIN });
        }
    }
    next();
}


export const isUserLoggedIn = async (request: Request, response: Response, next: NextFunction) => {

    //check if the headers are valid
    const userToken = request.headers['token'];
    const userId = request.headers['user_id'];
    if (!userToken || !userId) {
        response.status(403).json({ message: errorMessages.INCORRECT_REQUEST_CONFIG });
    }
    const user = await Users.findOne({
        where: {
            id: userId,
            token: userToken
        }
    })
    if (!user || user.token !== userToken) {
        response.status(403).json({ message: errorMessages.NOT_LOGGED_IN });
    }
    request.user_id = user!.id.toString();
    next();
}

export const hasPermission = async (permission: string) => {
    //check if the headers are valid
    return async function (request: Request, response: Response, next: NextFunction) {
        const userToken = request.headers['token'];
        const userId = request.headers['user_id'];
        if (!userToken || !userId) {
            response.status(403).json({ message: errorMessages.INCORRECT_REQUEST_CONFIG });
        }
        const user = await Users.findOne({
            where: {
                id: userId,
                token: userToken
            }
        })
        if (!user || user.token !== userToken) {
            response.status(403).json({ message: errorMessages.NOT_LOGGED_IN });
        }
        const rolePermissions = await get_role_permissions_function({ id: user!.role_id.toString() });
        if (!rolePermissions.find(item => item.name === permission)) {
            response.status(403).json({ message: errorMessages.NO_PERMISSION });
        }
        request.user_id = user!.id.toString();
        next();
    }
}
