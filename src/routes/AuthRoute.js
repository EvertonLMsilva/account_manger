const express = require("express");
const AuthController = require("../controller/AuthController");
const route = express.Router();

//route authenticate
route.post("/authenticate", AuthController.authenticate);
route.post("/isMe", AuthController.isme);
module.exports = route;
