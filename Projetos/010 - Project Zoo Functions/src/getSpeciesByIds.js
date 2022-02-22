const data = require('../data/zoo_data');

const animais = Object.values(data)[0];

function getSpeciesByIds(...ids) {
  const retorno = [];
  ids.forEach((valor) => {
    for (let index = 0; index < animais.length; index += 1) {
      if (animais[index].id === valor) {
        retorno.push(animais[index]);
      }
    }
  });
  return retorno;
}

module.exports = getSpeciesByIds;
