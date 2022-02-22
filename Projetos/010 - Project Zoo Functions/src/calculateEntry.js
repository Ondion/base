const data = require('../data/zoo_data');

function countEntrants(entrants) {
  return {
    child: (entrants.filter((element) => element.age < 18).length),
    adult: (entrants.filter((element) => element.age >= 18 && element.age < 50).length),
    senior: (entrants.filter((element) => element.age >= 50).length),
  };
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants.length === undefined) {
    return 0;
  }
  const totais = Object.values(countEntrants(entrants));
  totais[0] *= data.prices.child;
  totais[1] *= data.prices.adult;
  totais[2] *= data.prices.senior;
  return totais.reduce((p, c) => p + c);
}

module.exports = { calculateEntry, countEntrants };
