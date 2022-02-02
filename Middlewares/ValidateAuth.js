"use strict";

const joi = require('joi')
.extend(require("@joi/date"));
const { badRequest, internal } = require('../Utilities/ResponseCodes');

const createUser = joi.object({
  first_name: joi.string().trim().required(),
  last_name: joi.string().trim().allow(null).allow('').optional(),
  username: joi.string().trim().required(),
  date_of_birth: joi.date().format("DD-MM-YYYY").required()
  // .regex(/^([0-9]{2})([0-9]{2})([0-9]{4})$/).required()
})

const errorParser=(error)=>{
  
  let message=[];
  try {
    error.details?.forEach(err => {
      message.push(err.message);
    }); 
    return message;   
  } catch (error) {
      return message;
  }
}

const validateUserPayload= async(payload)=>{
  
  try {
    await createUser.validateAsync(payload);
    return {status:true}
  } catch (e) {
    console.log(e);
    let message = errorParser(e);
    return {status:false, message};
  }
};


module.exports={
  validateUserData: async(req, res, next)=>{
    try {
      /** Test create user payload */
      // console.log(req.body);
      let check = await validateUserPayload(req.body);
      if(!check.status) return badRequest(res, check.message);
      next();
    } catch (e) {
      return internal(res);
    }
  }
}