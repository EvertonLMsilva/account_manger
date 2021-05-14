const express = require("express");
const AuthRoute = require("./AuthRoute");
const UserRoute = require("./UserRoute");
const BillRoute = require("./BillRoute");
const CompanyRoute = require("./CompanyRoute");
const acl = require("express-acl");
const options = require("../config/roles/aclConfig");

//Middlewares
const auth = require("../middleware/authMiddleware");
const route = express.Router();

route.use("/auth", AuthRoute);

route.use(auth);
acl.config(options);
route.use(acl.authorize);

route.use("/bill", BillRoute);
route.use("/company", CompanyRoute);
route.use("/user", UserRoute);

module.exports = route;
