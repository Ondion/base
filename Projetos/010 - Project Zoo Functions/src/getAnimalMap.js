const data = require('../data/zoo_data');

const animais = data.species;

function getAnimalMapNoFilter() {
  const retorno = { NE: [], NW: [], SE: [], SW: [] };
  animais.forEach((element) => {
    if (element.location === 'NE') {
      retorno.NE.push(element.name);
    } else if (element.location === 'NW') {
      retorno.NW.push(element.name);
    } else if (element.location === 'SE') {
      retorno.SE.push(element.name);
    } else {
      retorno.SW.push(element.name);
    }
  });
  return retorno;
}

function getAnimalMapNames() {
  const retorno = { NE: [], NW: [], SE: [], SW: [] };
  animais.forEach((element, index) => {
    const obj = {};
    if (element.location === 'NE') {
      obj[animais[index].name] = animais[index].residents.map((ele) => ele.name);
      retorno.NE.push(obj);
    } else if (element.location === 'NW') {
      obj[animais[index].name] = animais[index].residents.map((ele) => ele.name);
      retorno.NW.push(obj);
    } else if (element.location === 'SE') {
      obj[animais[index].name] = animais[index].residents.map((ele) => ele.name);
      retorno.SE.push(obj);
    } else {
      obj[animais[index].name] = animais[index].residents.map((ele) => ele.name);
      retorno.SW.push(obj);
    }
  });
  return retorno;
}

function getAnimalMapSorted() {
  const retorn = { NE: [], NW: [], SE: [], SW: [] };
  animais.forEach((element, index) => {
    const obj = {};
    if (element.location === 'NE') {
      obj[animais[index].name] = animais[index].residents.map((ele) => ele.name).sort();
      retorn.NE.push(obj);
    } else if (element.location === 'NW') {
      obj[animais[index].name] = animais[index].residents.map((ele) => ele.name).sort();
      retorn.NW.push(obj);
    } else if (element.location === 'SE') {
      obj[animais[index].name] = animais[index].residents.map((ele) => ele.name).sort();
      retorn.SE.push(obj);
    } else {
      obj[animais[index].name] = animais[index].residents.map((ele) => ele.name).sort();
      retorn.SW.push(obj);
    }
  });
  return retorn;
}

function animaisFemeasA(valor, callback) {
  const ret = [];
  animais.forEach((element, index) => {
    if (element.location === valor) {
      const obj = {};
      const teste = animais[index].residents.map((ele) => {
        if (ele.sex === 'female') {
          return ele.name;
        } return 0;
      });
      obj[animais[index].name] = teste.filter((valores) => valores);
      ret.push(obj);
    }
  });
  return ret;
}
function animaisFemeas() {
  const retorn = { NE: [], NW: [], SE: [], SW: [] };
  retorn.NE = animaisFemeasA('NE');
  retorn.NW = animaisFemeasA('NW');
  retorn.SE = animaisFemeasA('SE');
  retorn.SW = animaisFemeasA('SW');
  return retorn;
}

function animaisFemeasSortedA(valor) {
  const ret = [];
  animais.forEach((element, index) => {
    if (element.location === valor) {
      const obj = {};
      const teste = animais[index].residents.map((elem) => {
        if (elem.sex === 'female') {
          return elem.name;
        } return 0;
      });
      obj[animais[index].name] = teste.filter((valores) => valores).sort();
      ret.push(obj);
    }
  });
  return ret;
}

function animaisFemeasSorted() {
  const retorn = { NE: [], NW: [], SE: [], SW: [] };
  retorn.NE = animaisFemeasSortedA('NE');
  retorn.NW = animaisFemeasSortedA('NW');
  retorn.SE = animaisFemeasSortedA('SE');
  retorn.SW = animaisFemeasSortedA('SW');
  return retorn;
}

function callFunction({ includeNames = true, sex = 'male', sorted = false }) {
  if (sex === 'male' && sorted === true) {
    return getAnimalMapSorted();
  } if (sex === 'female' && sorted === false) {
    return animaisFemeas();
  }
  return animaisFemeasSorted();
}

function getAnimalMap(values) {
  if (values === undefined || values.includeNames === undefined) {
    return getAnimalMapNoFilter();
  } if (values.sex === undefined && values.sorted === undefined) {
    return getAnimalMapNames();
  }
  return callFunction(values);
}

module.exports = getAnimalMap;
