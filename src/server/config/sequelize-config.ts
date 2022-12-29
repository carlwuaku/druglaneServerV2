import { Sequelize } from 'sequelize-typescript'
import { constants } from '../constants'
import models from '../models/index'
import {config} from './config';
const connection = new Sequelize(config[process.env.NODE_ENV])

connection.addModels(models)

export { connection as sequelize };
