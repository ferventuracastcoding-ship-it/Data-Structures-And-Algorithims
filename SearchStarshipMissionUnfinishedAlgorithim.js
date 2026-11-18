// This is practice syntaxto get better at javascript
// Search for a Starship mission name inside a larger mission log.

function searchStarshipMission(missionLog, targetMission) {
  for (
    let missionIndex = 0;
    missionIndex <= missionLog.length - targetMission.length;
    missionIndex++
  ) {
    let matchFound = true;

    for (
      let characterIndex = 0;
      characterIndex < targetMission.length;
      characterIndex++
    ) {
      if (
        missionLog[missionIndex + characterIndex] !==
        targetMission[characterIndex]
      ) {
        matchFound = false;
        break;
      }
    }

    if (matchFound) {
      return missionIndex;
    }
  }

  return -1;
}

const starshipMissionLog =
  "Mars Starship Mission Starship-24 Rover Deployment";

console.log(
  "Mission found at:",
  searchStarshipMission(
    starshipMissionLog,
    "Starship-24"
  )
);


// 13. DEPTH-FIRST SEARCH WITH RECURSION
// Search a connected network of Mars robots.

function recursiveRobotSearch(
  marsNetwork,
  currentRobot,
  targetRobot,
  visitedRobots = new Set()
) {
  if (currentRobot === targetRobot) {
    return true;
  }

  if (visitedRobots.has(currentRobot)) {
    return false;
  }

  visitedRobots.add(currentRobot);

  const connectedRobots =
    marsNetwork[currentRobot] || [];

  for (const robot of connectedRobots) {
    if (
      recursiveRobotSearch(
        marsNetwork,
        robot,
        targetRobot,
        visitedRobots
      )
    ) {
      return true;
    }
  }

  return false;
}

const robotCommunicationNetwork = {
  "Robot-A": ["Robot-B", "Rover-A"],
  "Robot-B": ["Robot-A", "Robot-C"],
  "Robot-C": ["Robot-B", "Rover-B"],
  "Rover-A": ["Robot-A", "MarsBase"],
  "Rover-B": ["Robot-C", "MarsBase"],
  "MarsBase": ["Rover-A", "Rover-B"]
};

console.log(
  "Robot located:",
  recursiveRobotSearch(
    robotCommunicationNetwork,
    "Robot-A",
    "MarsBase"
  )
);
