const express = require("express");
const applyMiddleware = require("./middleware");
const routes = require("./routes");

//express app
const app = express();

applyMiddleware(app);

app.use(routes);

//Global Error Handler
app.use((err, _req, res, next) => {
  console.log({ message: err.message, code: err.code, error: err.error });
  // console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
 


