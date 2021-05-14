const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
//utils
const { debuggLog } = require("../utils/debuggLog");
//models
const UserModel = require("../model/UserModel");
const CompanyModel = require("../model/CompanyModel");
const BillModel = require("../model/BillModel");

const connection = new Sequelize(dbConfig);
const interval = setInterval(() => {
  connection
    .authenticate()
    .then(() => {
      debuggLog("Connection has been established successfully.", "sucess");

      clearInterval(interval);
    })
    .catch((err) => {
      debuggLog("Erro ao conectar na base de dados!", "err");
    });
}, 2000);

UserModel.init(connection);
CompanyModel.init(connection);
BillModel.init(connection);

UserModel.associate(connection.models);
CompanyModel.associate(connection.models);
BillModel.associate(connection.models);

module.exports = connection;
