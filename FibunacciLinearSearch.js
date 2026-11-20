// ============================================
// FIBONACCI SEARCH ALGORITHM
// ============================================

// Sorted array to search.
const rockets = [
    10, 20, 30, 40, 50,
    60, 70, 80, 90, 100,
    110, 120, 130, 140, 150
];

// Fibonacci Search function.
function fibonacciSearch(array, target) {

    // Fibonacci number F(n-2).
    let fibMinus2 = 0;

    // Fibonacci number F(n-1).
    let fibMinus1 = 1;

    // Fibonacci number F(n).
    let fib = fibMinus1 + fibMinus2;

    // Find the smallest Fibonacci number
    // greater than or equal to the array length.
    while (fib < array.length) {
        fibMinus2 = fibMinus1;
        fibMinus1 = fib;
        fib = fibMinus1 + fibMinus2;
    }

    // Marks the eliminated range from the front.
    let offset = -1;

    // Continue searching while the Fibonacci
    // number is greater than 1.
    while (fib > 1) {

        // Calculate the index to inspect.
        const index = Math.min(
            offset + fibMinus2,
            array.length - 1
        );

        // If the current value is smaller
        // than the target, move to the right.
        if (array[index] < target) {

            fib = fibMinus1;
            fibMinus1 = fibMinus2;
            fibMinus2 = fib - fibMinus1;

            offset = index;
        }

        // If the current value is greater
        // than the target, move to the left.
        else if (array[index] > target) {

            fib = fibMinus2;
            fibMinus1 = fibMinus1 - fibMinus2;
            fibMinus2 = fib - fibMinus1;
        }

        // Target has been found.
        else {
            return index;
        }
    }

    // Check the final possible element.
    if (
        fibMinus1 &&
        offset + 1 < array.length &&
        array[offset + 1] === target
    ) {
        return offset + 1;
    }

    // Target was not found.
    return -1;
}


// ============================================
// TEST THE SEARCH
// ============================================

const target = 90;

const result = fibonacciSearch(rockets, target);


// ============================================
// DISPLAY RESULT
// ============================================

if (result !== -1) {
    console.log(`Target ${target} found at index ${result}.`);
} else {
    console.log(`Target ${target} was not found.`);
}
