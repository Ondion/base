const data = require('../data/zoo_data');

function speciesNames(id) {
  const idBrute = data.employees.find((element) => element.id === id);
  const names = [];
  idBrute.responsibleFor.forEach((elemento) => {
    data.species.forEach((elemento2) => {
      if (elemento2.id === elemento) {
        names.push(elemento2.name);
      }
    });
  });
  return names;
}

function speciesLocations(id) {
  const idBrute = data.employees.find((element) => element.id === id);
  const names = [];
  idBrute.responsibleFor.forEach((elemento) => {
    data.species.forEach((elemento2) => {
      if (elemento2.id === elemento) {
        names.push(elemento2.location);
      }
    });
  });
  return names;
}

function idEName() {
  const arrayMain = [];
  data.employees.forEach((element) => {
    arrayMain.push({
      id: element.id,
      fullName: `${element.firstName} ${element.lastName}`,
      species: speciesNames(element.id),
      locations: speciesLocations(element.id),
    });
  });
  return arrayMain;
}

function findByName(name) {
  const valores = idEName();
  return valores.find((busca) => busca.fullName.includes(name));
}

function findByID(id) {
  const valores = idEName();
  const retorno = valores.find((busca) => busca.id.includes(id));
  if (retorno === undefined) {
    throw new Error('Informações inválidas');
  }
  return retorno;
}

function getEmployeesCoverage(value) {
  if (value === undefined) {
    return idEName();
  }
  if (value.id === undefined) {
    return findByName(value.name);
  }
  if (value.name === undefined) {
    return findByID(value.id);
  }
}

module.exports = getEmployeesCoverage;
