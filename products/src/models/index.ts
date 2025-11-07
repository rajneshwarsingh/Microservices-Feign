import fs from 'fs';
import path from 'path';
import { config } from '../config/default';

const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const key: string = process.env.NODE_ENV || 'development';
const { host, userName, password, database, dialect, port, logging } = config[key].db;
const db: any = {};

// Connection String
//console.log("Database: ", database, "Username: ", userName, "password: ", password, "host: ", host, "port", port)

const sequelize = new Sequelize(database, userName, password, {
  host,
  dialect,
  port,
  logging,
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.ts' || file.slice(-3) === '.js');
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: any) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.DataTypes = Sequelize;
db.Op = Sequelize.Op;
export { db };
