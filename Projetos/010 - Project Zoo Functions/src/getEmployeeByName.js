const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const retorno = data.employees.filter((element) => element.firstName === employeeName
  || element.lastName === employeeName);
  return retorno[0];
}

module.exports = getEmployeeByName;
