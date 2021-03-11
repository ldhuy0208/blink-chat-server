const {
  ERROR_MONGOOSE_VALIDATE,
  NOT_FOUND,
} = require("../constants/errorCodeConstant");

/*
  MongoDB Validation Error Handler
*/
exports.mongooseErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  res.status(400).send({
    error: {
      code: ERROR_MONGOOSE_VALIDATE,
      message: err.errors[Object.keys(err.errors)[0]].message,
      status: 400,
    },
  });
};

/*
  Development Error Handler
*/
exports.developmentInternalErrors = (err, req, res, next) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };

  res.status(err.status || 500).send(errorDetails); // send JSON back
};

/*
  Production Error Handler
  No stacktraces and error details are leaked to user
*/
exports.productionInternalErrors = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({
    error: "Internal Server Error",
  });
};

/*
  not found any routers
 */
exports.notFound = (req, res, next) => {
  res.status(404).send({ error: "Not found" });
};
