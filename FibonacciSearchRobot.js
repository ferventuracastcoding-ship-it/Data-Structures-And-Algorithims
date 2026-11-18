//I love space and fibunacci algorithims
// Search for a specific Mars robot using Fibonacci numbers.

function fibonacciSearchRobot(robotFleet, targetRobot) {
  let fibonacciMinus2 = 0;
  let fibonacciMinus1 = 1;
  let fibonacciNumber = fibonacciMinus1 + fibonacciMinus2;

  while (fibonacciNumber < robotFleet.length) {
    fibonacciMinus2 = fibonacciMinus1;
    fibonacciMinus1 = fibonacciNumber;
    fibonacciNumber = fibonacciMinus1 + fibonacciMinus2;
  }

  let offset = -1;

  while (fibonacciNumber > 1) {
    const index = Math.min(
      offset + fibonacciMinus2,
      robotFleet.length - 1
    );

    if (robotFleet[index] < targetRobot) {
      fibonacciNumber = fibonacciMinus1;
      fibonacciMinus1 = fibonacciMinus2;
      fibonacciMinus2 = fibonacciNumber - fibonacciMinus1;
      offset = index;
    } else if (robotFleet[index] > targetRobot) {
      fibonacciNumber = fibonacciMinus2;
      fibonacciMinus1 = fibonacciMinus1 - fibonacciMinus2;
      fibonacciMinus2 = fibonacciNumber - fibonacciMinus1;
    } else {
      return index;
    }
  }

  if (
    fibonacciMinus1 &&
    offset + 1 < robotFleet.length &&
    robotFleet[offset + 1] === targetRobot
  ) {
    return offset + 1;
  }

  return -1;
}

const marsRobotFleet = [
  "AresBot",
  "AtlasBot",
  "ExplorerBot",
  "GuardianBot",
  "RangerBot",
  "ScoutBot",
  "TitanBot"
];

console.log(
  "Robot index:",
  fibonacciSearchRobot(marsRobotFleet, "RangerBot")
);


// 7. TERNARY SEARCH
// Search for a Starship in a sorted fleet by dividing the search
// space into three sections.

function ternarySearchStarship(starshipFleet, targetStarship) {
  let left = 0;
  let right = starshipFleet.length - 1;

  while (left <= right) {
    const firstThird =
      left + Math.floor((right - left) / 3);

    const secondThird =
      right - Math.floor((right - left) / 3);

    if (starshipFleet[firstThird] === targetStarship) {
      return firstThird;
    }

    if (starshipFleet[secondThird] === targetStarship) {
      return secondThird;
    }

    if (targetStarship < starshipFleet[firstThird]) {
      right = firstThird - 1;
    } else if (targetStarship > starshipFleet[secondThird]) {
      left = secondThird + 1;
    } else {
      left = firstThird + 1;
      right = secondThird - 1;
    }
  }

  return -1;
}

const marsStarships = [
  "Starship-Alpha",
  "Starship-Beta",
  "Starship-Delta",
  "Starship-Gamma",
  "Starship-Omega",
  "Starship-Sigma"
];

console.log(
  "Starship index:",
  ternarySearchStarship(marsStarships, "Starship-Omega")
);


// 8. HASH TABLE SEARCH
// Find a Mars rover instantly using a JavaScript Map.

function findRoverById(roverDatabase, roverId) {
  if (roverDatabase.has(roverId)) {
    return roverDatabase.get(roverId);
  }

  return null;
}

const roverDatabase = new Map([
  ["MR-001", "Perseverance"],
  ["MR-002", "Curiosity"],
  ["MR-003", "Spirit"],
  ["MR-004", "Opportunity"],
  ["MR-005", "Sojourner"]
]);

console.log(
  "Selected rover:",
  findRoverById(roverDatabase, "MR-002")
);


// 9. DEPTH-FIRST SEARCH
// Search through a network of Mars robots and rovers.

function depthFirstSearchMars(graph, startingNode, targetNode) {
  const visited = new Set();
  const searchStack = [startingNode];

  while (searchStack.length > 0) {
    const currentNode = searchStack.pop();

    if (visited.has(currentNode)) {
      continue;
    }

    visited.add(currentNode);

    console.log("Scanning:", currentNode);

    if (currentNode === targetNode) {
      return true;
    }

    const neighbors = graph[currentNode] || [];

    for (let neighborIndex = neighbors.length - 1; neighborIndex >= 0; neighborIndex--) {
      if (!visited.has(neighbors[neighborIndex])) {
        searchStack.push(neighbors[neighborIndex]);
      }
    }
  }

  return false;
}

const marsRobotNetwork = {
  "MarsBase": ["Rover-01", "Robot-01"],
  "Rover-01": ["MarsBase", "Starship-01"],
  "Robot-01": ["MarsBase", "Rover-02"],
  "Rover-02": ["Robot-01", "Starship-02"],
  "Starship-01": ["Rover-01"],
  "Starship-02": ["Rover-02"]
};

console.log(
  "Target found:",
  depthFirstSearchMars(
    marsRobotNetwork,
    "MarsBase",
    "Starship-02"
  )
);


// 10. BREADTH-FIRST SEARCH
// Search a Mars transportation network level by level.

function breadthFirstSearchMars(graph, startingNode, targetNode) {
  const visited = new Set();
  const searchQueue = [startingNode];

  visited.add(startingNode);

  while (searchQueue.length > 0) {
    const currentNode = searchQueue.shift();

    console.log("Scanning:", currentNode);

    if (currentNode === targetNode) {
      return true;
    }

    const neighbors = graph[currentNode] || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        searchQueue.push(neighbor);
      }
    }
  }

  return false;
}

const marsMissionNetwork = {
  "Starship": ["MarsOrbit", "LaunchPad"],
  "MarsOrbit": ["Starship", "MarsBase"],
  "LaunchPad": ["Starship", "RoverGarage"],
  "MarsBase": ["MarsOrbit", "RoverGarage"],
  "RoverGarage": ["LaunchPad", "MarsBase", "Rover-01"],
  "Rover-01": ["RoverGarage", "Robot-01"],
  "Robot-01": ["Rover-01"]
};

console.log(
  "Mission destination found:",
  breadthFirstSearchMars(
    marsMissionNetwork,
    "Starship",
    "Robot-01"
  )
);
