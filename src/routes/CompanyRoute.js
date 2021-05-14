const express = require("express");
const CompanyController = require("../controller/CompanyController");
const route = express.Router();

//Buscar por usuários.
route.get("/all", CompanyController.show);
//Buscar por um usuário.
route.get("/:id", CompanyController.showOne);
//Registra um usuário.
route.post("/register", CompanyController.register);
//Deletar um usuário.
route.delete("/:id", CompanyController.delete);

module.exports = route;
