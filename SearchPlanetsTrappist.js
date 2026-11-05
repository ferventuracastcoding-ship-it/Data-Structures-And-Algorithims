function searchPlanet(name) {
  const index = hashPlanet(name, tableSize);

  const bucket = planetTable[index];

  for (const planet of bucket) {
    if (planet.name === name) {
      return planet;
    }
  }

  return null;
}

console.log(searchPlanet("TRAPPIST-1e"));
console.log("Trappist is the best Solar System for light speed travel in the scinece fiction realm");
