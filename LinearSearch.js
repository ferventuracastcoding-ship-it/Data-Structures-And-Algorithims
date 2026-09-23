// Linear Search
document.addEventListener(
  "keydown",
  event => {
    event.preventDefault();
    if(!searching) {
      startSearch();
    } else{
      pauseSearch();
    }
  }
  if (event.key === "ArrowLRight") {
      stepSearch();
  }
  if (event.key === "r) {
      resetLab();
  }
)
// function bestCase() {}
// function worstCase() {}
// arrray = example[number].array;
// target = examples[number].target;
// loadData();
