"use strict";
const  { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

// local DB credentials
// const DB = process.env.DB;
// const host = process.env.host;
// const user = process.env.user;
// const password = process.env.password;
// const dialect = process.env.dialect;
// const sequelize = new Sequelize(
//   DB,
//   user,
//   password,
//   {
//     host: host,
//     dialect: dialect,
//   }
// )

const CDU = process.env.CLEARDB_DATABASE_URL;

const sequelize = new Sequelize(CDU);


const check = async()=>{
  try {
    await sequelize.authenticate();
    
    console.log("Database Connected");
  } catch (e) {
    console.log(`Data base error is \n ${e} \n `);
  }
}
check();

// const SYNC = async()=>{
//   await sequelize.sync({alter: false, force: false});
// }
const SYNC = async()=>{
  await sequelize.sync({alter: true});
}
SYNC();



module.exports = {db: sequelize, _type:DataTypes, _op:Op, _literal:Sequelize.literal};