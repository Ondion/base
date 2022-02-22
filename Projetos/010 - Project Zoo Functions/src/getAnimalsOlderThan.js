const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  let retorno = true;
  data.species.forEach((element) => {
    if (element.name === animal) {
      retorno = element.residents.every((elemento) => elemento.age >= age);
    }
  });
  return retorno;
}

module.exports = getAnimalsOlderThan;
