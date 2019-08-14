const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes")(app);

app.use(function (err, req, res, next) { // error handler middleware, called with 'next'
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
