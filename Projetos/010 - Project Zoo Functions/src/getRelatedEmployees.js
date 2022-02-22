const data = require('../data/zoo_data');

function isManager(id) {
  let array = [];
  data.employees.forEach((element) => array.push(element.managers));
  array += '';
  array.split(',');
  return array.includes(id);
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  const arrayNomes = [];
  data.employees.forEach((element) => {
    if (element.managers.includes(managerId)) {
      arrayNomes.push(`${element.firstName} ${element.lastName}`);
    }
  });
  return arrayNomes;
}

module.exports = { isManager, getRelatedEmployees };
