// 1. LINEAR SEARCH
// Search for a specific Mars rover by checking every rover one at a time.

function linearSearchRover(roverFleet, targetRover) {
  for (let roverIndex = 0; roverIndex < roverFleet.length; roverIndex++) {
    if (roverFleet[roverIndex] === targetRover) {
      return roverIndex;
    }
  }
  return -1;
}

const marsRovers = [
  "Curiosity",
  "Perseverance",
  "Spirit",
  "Opportunity",
  "Sojourner"
];

console.log(
  "Rover found at index:",
  linearSearchRover(marsRovers, "Perseverance")
);


// 2. BINARY SEARCH
// Find a Starship in a sorted Starship fleet.

function binarySearchStarship(starshipFleet, targetStarship) {
  let left = 0;
  let right = starshipFleet.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (starshipFleet[middle] === targetStarship) {
      return middle;
    }

    if (starshipFleet[middle] < targetStarship) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

const starships = [
  "Starship-01",
  "Starship-02",
  "Starship-03",
  "Starship-04",
  "Starship-05",
  "Starship-06",
  "Starship-07",
  "Starship-08"
];

console.log(
  "Starship found at index:",
  binarySearchStarship(starships, "Starship-05")
);


// 3. JUMP SEARCH
// Search for a specific robot in a sorted Mars robot database.

function jumpSearchRobot(robotFleet, targetRobot) {
  const robotCount = robotFleet.length;
  const jumpSize = Math.floor(Math.sqrt(robotCount));

  let previous = 0;
  let current = jumpSize;

  while (
    current < robotCount &&
    robotFleet[Math.min(current, robotCount) - 1] < targetRobot
  ) {
    previous = current;
    current += jumpSize;

    if (previous >= robotCount) {
      return -1;
    }
  }

  while (
    previous < Math.min(current, robotCount) &&
    robotFleet[previous] < targetRobot
  ) {
    previous++;
  }

  if (
    previous < Math.min(current, robotCount) &&
    robotFleet[previous] === targetRobot
  ) {
    return previous;
  }

  return -1;
}

const marsRobots = [
  "Atlas",
  "CuriosityBot",
  "Dragon",
  "Explorer",
  "Guardian",
  "Ranger",
  "Scout",
  "Titan"
];

console.log(
  "Robot found at index:",
  jumpSearchRobot(marsRobots, "Ranger")
);


// 4. INTERPOLATION SEARCH
// Search for a Starship using numeric launch IDs.
// Works best when IDs are evenly distributed.

function interpolationSearchStarship(starshipLaunchIds, targetLaunchId) {
  let low = 0;
  let high = starshipLaunchIds.length - 1;

  while (
    low <= high &&
    targetLaunchId >= starshipLaunchIds[low] &&
    targetLaunchId <= starshipLaunchIds[high]
  ) {
    if (low === high) {
      return starshipLaunchIds[low] === targetLaunchId ? low : -1;
    }

    const position =
      low +
      Math.floor(
        ((targetLaunchId - starshipLaunchIds[low]) *
          (high - low)) /
          (starshipLaunchIds[high] - starshipLaunchIds[low])
      );

    if (starshipLaunchIds[position] === targetLaunchId) {
      return position;
    }

    if (starshipLaunchIds[position] < targetLaunchId) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }

  return -1;
}

const starshipLaunchIds = [
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900
];

console.log(
  "Starship launch ID found at index:",
  interpolationSearchStarship(starshipLaunchIds, 700)
);


// 5. EXPONENTIAL SEARCH
// Quickly locate a Mars rover in a large sorted rover database.

function exponentialSearchRover(roverDatabase, targetRover) {
  const roverCount = roverDatabase.length;

  if (roverDatabase[0] === targetRover) {
    return 0;
  }

  let roverRange = 1;

  while (
    roverRange < roverCount &&
    roverDatabase[roverRange] <= targetRover
  ) {
    roverRange *= 2;
  }

  let left = Math.floor(roverRange / 2);
  let right = Math.min(roverRange, roverCount - 1);

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (roverDatabase[middle] === targetRover) {
      return middle;
    }

    if (roverDatabase[middle] < targetRover) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

const marsRoverDatabase = [
  "Ares-01",
  "Ares-02",
  "Ares-03",
  "Ares-04",
  "Ares-05",
  "Ares-06",
  "Ares-07",
  "Ares-08",
  "Ares-09",
  "Ares-10",
  "Ares-11",
  "Ares-12"
];

console.log(
  "Mars rover found at index:",
  exponentialSearchRover(marsRoverDatabase, "Ares-09")
);
