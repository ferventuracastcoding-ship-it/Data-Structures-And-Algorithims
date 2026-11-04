const tableSize = 200;
const planetTable = Array.from(
  { length: tableSize },
  () => []
);

function insertPlanet(planet) {
  const index = hashPlanet(planet.name, tableSize);

  planetTable[index].push(planet);

  console.log(
    `${planet.name} stored at index ${index}`
  );
}

const planets = [
  { name: "TRAPPIST-1b", period: 1.51, radius: 1.12 },
  { name: "TRAPPIST-1c", period: 2.42, radius: 1.10 },
  { name: "TRAPPIST-1d", period: 4.05, radius: 0.78 },
  { name: "TRAPPIST-1e", period: 6.10, radius: 0.92 },
  { name: "TRAPPIST-1f", period: 9.21, radius: 1.05 },
  { name: "TRAPPIST-1g", period: 12.35, radius: 1.13 },
  { name: "TRAPPIST-1h", period: 18.77, radius: 0.76 }
];

planets.forEach(insertPlanet);
