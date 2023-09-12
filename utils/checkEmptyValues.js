const { throwError } = require("./throwError");

function checkEmptyValues() {
  let result = false;
  for (let i = 0; i < arguments.length; i++) {
    result = result || !arguments[i];
  }
  if (result) {
    throwError(400, "KEY_ERROR");
  }
}

module.exports = {
  checkEmptyValues,
};
