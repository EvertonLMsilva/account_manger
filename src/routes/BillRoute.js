const express = require("express");
const BillController = require("../controller/BillController");
const route = express.Router();

//Buscar por usuários.
route.get("/all", BillController.show);
//Buscar por um usuário.
route.get("/:id", BillController.showOne);
//Registra um usuário.
route.post("/register", BillController.register);
//Deletar um usuário.
route.delete("/:id", BillController.delete);

module.exports = route;
