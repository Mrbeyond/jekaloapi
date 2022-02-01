'use strict';
const { hack } = require('../../Utilities/hashers');
const {db, _type} = require('../DB');

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
    validate:{
      min: 3
    }
  },  

  date_of_birth:{
    type: _type.STRING
    // allowNull: true
  },

})

// const SYNC = async()=>{
//   await db.sync({alter: true});
// }
// SYNC();


User.prototype.toJSON= function(){
  let val = Object.assign({}, this.get());
  // console.log("from to json", val); 
  delete val.password;
  val.id = hack(val.id);
  val.accName = val.userName? val.userName: `${val.firstName} ${val.lastName}`;
  val.profilePic = val.profilePic?val.profilePic:'defaultDp.png'
  val.about = val.about?val.about:"";
  return val;
}

User.prototype.raws= function(){
  return Object.assign({}, this.get());
}

module.exports={
  User,
}