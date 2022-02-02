'use strict';
const {db, _type} = require('./DB');

const User = db.define("user", {
  id:{
    type: _type.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name:{
    allowNull: false,
    type: _type.STRING
  },
  last_name:{
    allowNull: true,
    type: _type.STRING
  },
  username:{
    type: _type.STRING,
    unique: true,
    allowNull: false,
    // validate:{
    //   min: 3
    // }
  },  

  date_of_birth:{
    type: _type.STRING,
    allowNull: false
  },

})

// const SYNC = async()=>{
//   await db.sync({alter: true});
// }
// SYNC();


User.prototype.toJSON= function(){
  let val = Object.assign({}, this.get());
  // console.log("from to json", val); 
  let {first_name, last_name, username, date_of_birth} = val;
  let name_prefix = first_name.slice(0,1)
  if(last_name) name_prefix += last_name.slice(0,1);
  name_prefix = name_prefix.toString().toUpperCase();
  return {name_prefix, first_name, last_name, username, date_of_birth};
}

User.prototype.raws= function(){
  return Object.assign({}, this.get());
}

module.exports={
  User,
}