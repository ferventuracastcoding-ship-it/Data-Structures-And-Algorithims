function hashPlanet(name, tableSize) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i))
      % tableSize;
  }

  return hash;
}

console.log(hashPlanet("TRAPPIST-1b", 17));
console.log(hashPlanet("TRAPPIST-1c", 17));
console.log(hashPlanet("TRAPPIST-1d", 17));
