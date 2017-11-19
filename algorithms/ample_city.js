function findAmpleCity (gallons, distances) {
  // [5,   10,  20,  15]
  // [200,100, 500, 200]
  // [0, 5, 20, 10]
  // [10, 0, 15, 5]
  const MPG = 20;
  const lastIdx = gallons.length - 1;
  let remainingGas = 0;
  let city = {
    idx: 0,
    remainingGas: 0
  };

  for (let i = 1; i <= lastIdx; ++i) {
    remainingGas += gallons[i - 1] - distances[i - 1] / MPG;
    if (remainingGas < city.remainingGas) {
      city.remainingGas = remainingGas;
      city.idx = i;
    }
  }

  return city.idx;
}

console.log('Run: testFindAmpleCity(gallons, distances) to run')
function testFindAmpleCity (gallons, distances) {
  const MPG = 20;

  gallons = gallons || [20, 15, 15, 15, 35, 25, 30, 15, 65, 45, 10, 45, 25];
  distances = distances || [15 * MPG, 20 * MPG, 50 * MPG, 15 * MPG, 15 * MPG, 30 * MPG, 20 * MPG,
    55 * MPG, 20 * MPG, 50 * MPG, 10 * MPG, 15 * MPG, 15 * MPG];

  let c = findAmpleCity(gallons, distances);
  let s = c;
  let gas = 0;
  do {
    gas += gallons[s] - distances[s] / MPG;
    console.assert(gas >= 0);
    s = (s + 1) % gallons.length;
  } while (s != c);
}