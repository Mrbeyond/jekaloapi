"use strict";
const { User } = require("../Models/User");
const { forbidden , internal, success, badRequest, notFound } = require("../Utilities/ResponseCodes");
class  Auths{
  
  /** Method that creates new user */
  static async signup(req, res){
    try {
      let {username} = req.body;
      // check if user already exists
      let check = await User.findOne({where:{username}});
      if(check) return forbidden(res, "User already exists");
      let user = await User.create( req.body);
      return success(res, user.toJSON());
    } catch (e) {
      // console.log(e);
     return internal(res);
    }
  }

  static async getUsers(req, res){
    try {
      let users = await User.findAll();
      return res.status(200).json(users);
    } catch (e) {
      // console.log(e);
     return internal(res);
    }
  }

    /** Delete a specific article */
    static async deleteuser(req, res){
      try {
        let {username} = req.params;
        if(!username)  return badRequest(res);
        let exists = await User.count({where:{username}});
        if(!exists) return notFound(res, "User not found");
        await User.destroy({where:{username}})
        await User.destroy({where:{username: "   "}});   
  
        return success(res, {message: "You deleted the user successfully"});
      } catch (err) {
        // console.log({err});
        return internal(res);
      }
    }


}

module.exports = Auths;