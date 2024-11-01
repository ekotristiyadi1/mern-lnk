import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

export type Dialect =
  | 'mysql'
  | 'postgres'
  | 'sqlite'
  | 'mariadb'
  | 'mssql'
  | 'db2'
  | 'snowflake'
  | 'oracle';

interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  dialect?: Dialect;
  urlDatabase?: string;
  models?: any;
  define?: any;
  migrationStorageTableName?: string;
  seederStorageTableName?: string;
  uri?: string;
  options?: SequelizeOptions;
}

interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}

const defaultConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: process.env.DB_DIALECT as Dialect,
};

export const databaseConfig: IDatabaseConfig = {
  development: {
    ...defaultConfig,
    database: process.env.DB_NAME_DEVELOPMENT,
  },
  production: {
    ...defaultConfig,
    database: process.env.DB_NAME_PRODUCTION,
  },
};

let config: IDatabaseConfigAttributes;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
  case 'PRODUCTION':
    config = databaseConfig.production;
    break;
  default:
    config = databaseConfig.development;
}

const jsonData = JSON.stringify(config, null, 2);
const filePath = __dirname + '/config.json';

fs.writeFileSync(filePath, jsonData, 'utf-8');

// console.log(`processing data ${filePath}`);

const sequelize = new Sequelize(config);

export default sequelize;
