const data = require('../data/zoo_data');

function availability(weekDay) {
  const arrayRetorno = [];
  if (weekDay === 'Monday') {
    return 'The zoo will be closed!';
  }
  data.species.map((element) => {
    if (element.availability.includes(weekDay)) {
      arrayRetorno.push(element.name);
    }
    return 0;
  });
  return arrayRetorno;
}

function hours(weekDay) {
  if (weekDay === 'Monday') {
    return 'CLOSED';
  }
  const day = Object.entries(data.hours).filter((element) => element.includes(weekDay));
  return `Open from ${day[0][1].open}am until ${day[0][1].close}pm`;
}

function createSchedule() {
  const weekDays = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
  const objRet = {};
  weekDays.forEach((element) => {
    objRet[element] = {
      officeHour: hours(element),
      exhibition: availability(element),
    };
  });
  return objRet;
}

function getAnimalA(name) {
  const days = data.species.find((element) => element.name === name);
  return days.availability;
}

function testWeekNames(name) {
  const arrayNomes = [];
  arrayNomes.push(Object.keys(data.hours));
  return arrayNomes.flat().includes(name);
}

function testAnimalNames(name) {
  const arrayNomes = [];
  data.species.forEach((elements) => arrayNomes.push(elements.name));
  return arrayNomes.includes(name);
}

function testNames(name) {
  return testWeekNames(name) || testAnimalNames(name);
}

function getSchedule(scheduleTarget) {
  if (scheduleTarget === undefined || testNames(scheduleTarget) === false) {
    return createSchedule();
  }
  if (testWeekNames(scheduleTarget)) {
    const objRet = {
      [scheduleTarget]: createSchedule()[scheduleTarget],
    };
    return objRet;
  }
  if (testAnimalNames(scheduleTarget)) {
    return getAnimalA(scheduleTarget);
  }
}

module.exports = getSchedule;
