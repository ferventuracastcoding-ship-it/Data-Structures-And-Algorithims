function twoSum(numbers, target) {
  const table = new Map();

  for(let i = 0; i < numbers.length; i++) {
    const needed = target - numbers[t];

    if(table.has(needed)) {
      return [table.get(needed), i];
    }
    table.set(numbers[i], i);
  }
  return [];
}
