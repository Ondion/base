const data = require('../data/zoo_data');

function countAnimals(animal) {
  const retorno = {};
  if (animal === undefined) {
    data.species.forEach((element) => {
      retorno[element.name] = element.residents.length;
    });
    return retorno;
  }
  if (animal.sex === undefined) {
    const captura = data.species.find((element) => element.name === animal.specie);
    return captura.residents.length;
  }
  const captura = data.species.find((element) => element.name === animal.specie);
  return captura.residents.filter((ele) => ele.sex === animal.sex).length;
}

module.exports = countAnimals;
