function analyzePlanets() {
  const results = [];

  for (const bucket of planetTable) {
    for (const planet of bucket) {

      let classification;

      if (
        ["TRAPPIST-1e", "TRAPPIST-1f", "TRAPPIST-1g"]
          .includes(planet.name)
      ) {
        classification = "Habitable-zone candidate";
      } else {
        classification = "Outside selected zone";
      }

      results.push({
        name: planet.name,
        orbitalPeriod: planet.period,
        radius: planet.radius,
        classification
      });
    }
  }

  return results;
}

console.table(analyzePlanets());
