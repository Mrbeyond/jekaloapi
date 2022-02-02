const { signup, getUsers, deleteuser } = require('../Controllers/Auths');
const { validateUserData } = require('../Middlewares/ValidateAuth');

const Router = require('express').Router();

Router.post("/user", validateUserData, signup);
Router.get("/users", getUsers);
Router.delete("/:username", deleteuser);

module.exports = Router;