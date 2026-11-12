// 🚀 EARTH → MARS
// 100 Starship Mission Algorithm
// Empty array
const fleet = [];

// 100 Starships
const TOTAL_SHIPS = 100;
const EARTH_TO_MARS_KM = 225_000_000;

// Create 100 Starships
for (let i = 1; i <= TOTAL_SHIPS; i++) {
  fleet.push({
    id: i,
    name: `Starship-${String(i).padStart(3, "0")}`,

    origin: "Earth",
    destination: "Mars",

    distanceTraveled: 0,

    remainingDistance: EARTH_TO_MARS_KM,

    fuel: 100,

    status: "Ready"
  });
}


// 🚀 Launch the fleet
function launchFleet(fleet) {
  fleet.forEach(ship => {
    ship.status = "In Transit";
  });

  console.log(`🚀 ${fleet.length} Starships launched from Earth!`);
}


// 🌌 Move the fleet through space
function travel(fleet, distancePerDay) {

  fleet.forEach(ship => {

    if (ship.status !== "In Transit") {
      return;
    }

    ship.distanceTraveled += distancePerDay;

    ship.remainingDistance =
      EARTH_TO_MARS_KM - ship.distanceTraveled;

    // Prevent negative distance
    if (ship.remainingDistance < 0) {
      ship.remainingDistance = 0;
    }

    // Consume fuel
    ship.fuel -= 0.05;

    if (ship.fuel < 0) {
      ship.fuel = 0;
    }

    // Check arrival
    if (ship.remainingDistance === 0) {
      ship.status = "Arrived at Mars";
    }

  });
}


// 🔴 Count ships that reached Mars
function countArrived(fleet) {

  return fleet.filter(
    ship => ship.status === "Arrived at Mars"
  ).length;

}


// 📊 Fleet statistics
function fleetReport(fleet) {

  const arrived = countArrived(fleet);

  const traveling = fleet.filter(
    ship => ship.status === "In Transit"
  ).length;

  console.log("\n🚀 FLEET REPORT");
  console.log("--------------------------");
  console.log("Total Starships:", fleet.length);
  console.log("In Transit:", traveling);
  console.log("Arrived at Mars:", arrived);
}


// 🚀 Launch
launchFleet(fleet);


// 🌌 Simulate 100 days
for (let day = 1; day <= 100; day++) {

  travel(fleet, 2_500_000);

  if (day % 10 === 0) {

    console.log(`\n🌌 DAY ${day}`);

    fleetReport(fleet);
  }
}
