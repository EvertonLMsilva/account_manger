const express = require("express");
const UserController = require("../controller/UserController");
const route = express.Router();

//Buscar por usuários.
route.get("/all", UserController.show);
//Buscar por um usuário.
route.get("/:id", UserController.showOne);
//Registra um usuário.
route.post("/register", UserController.register);
//Deletar um usuário.
route.delete("/:id", UserController.delete);

module.exports = route;
