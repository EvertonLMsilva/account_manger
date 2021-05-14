const express = require("express");
const routes = require("./src/routes");
const cors = require('cors');

//Database
require("./src/database");

const app = express();
app.use(express.json());

app.use("/api",cors(), routes);

const port = 3001;
app.listen(port, () => {
  console.log(`Api rodando na porta ${port}`);
});
