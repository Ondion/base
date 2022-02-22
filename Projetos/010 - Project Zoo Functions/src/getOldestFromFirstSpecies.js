const data = require('../data/zoo_data');

function retornaAnimal(id) {
  const retorno = [];
  data.species.forEach((element) => retorno.push([element.id, element.residents]));
  return retorno.find((element) => element.includes(id));
}

function retornaMaior(valores) {
  const valor = valores;
  let maiorValor = 0;
  valor[1].map((valori) => {
    if (valori.age > maiorValor) {
      maiorValor = valori.age;
    } return 0;
  });
  const elemento = valor[1].find((valore) => valore.age === maiorValor);
  return Object.values(elemento);
}

function getEmp(idEmp) {
  const elenm = idEmp;
  const teste = data.employees.map((element) => {
    if (elenm === element.id) {
      return element.responsibleFor[0];
    } return 0;
  }).find((valor) => valor);
  return teste;
}

function getOldestFromFirstSpecies(id) {
  return retornaMaior(retornaAnimal(getEmp(id)));
}

module.exports = getOldestFromFirstSpecies;
