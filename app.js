require("dotenv").config();
require("./src/database/mongoose");
const express = require("express");
const cors = require("cors");
const errorHandlers = require("./src/handlers/errorHandler");
const app = express();

//middleware parse request to json and cors
app.use(express.json());
app.use(cors());

//route
app.get("/user", (req, res) => {
  res.send("con cac");
});

//error handlers
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentInternalErrors);
} else {
  app.use(errorHandlers.productionInternalErrors);
}

module.exports = app;
