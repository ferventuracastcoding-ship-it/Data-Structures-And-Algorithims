const binarySearch(key, value) {
  console.log("Binary Search");
  return key + value;
}

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while(left <= right) {
    const mid = Math.floor((left + right) / 2);
    const current = arr[mid];

    if(current === target) {
      retrun mid;
    }
    if(current < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
const sortedNumbers = [2,5,8,12,16,20,38,56,72,91];
console.log(binarySearch(sortedNumbers, 23));
console.log(binarySearch(sortedNumbers, 10));

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length -1;

  while(left <= right) {
    // code
  }
}
