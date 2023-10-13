const ValidationError = require("../errors/ValidationError");

module.exports = function (err, req, res, next) {
  //console.error(err);
  if (err instanceof ValidationError) {
    res.status(422).json(err.errors);
  } else {
    console.log('============log validation error========================');
    console.log(err);
    console.log('====================================');
    res.sendStatus(500);
  }
};