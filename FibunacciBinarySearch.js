// ==========================================
// FIBONACCI BINARY SEARCH
// ==========================================

// Sorted data.
const rockets = [
    10, 20, 30, 40, 50,
    60, 70, 80, 90, 100,
    110, 120, 130, 140, 150
];

// Fibonacci Binary Search.
function fibonacciBinarySearch(array, target) {

    // Create the first three Fibonacci numbers.
    let fib1 = 0;
    let fib2 = 1;
    let fib3 = fib1 + fib2;

    // Find the first Fibonacci number
    // greater than or equal to the array length.
    while (fib3 < array.length) {
        fib1 = fib2;
        fib2 = fib3;
        fib3 = fib1 + fib2;
    }

    // Starting position outside the array.
    let offset = -1;

    // Continue reducing the search range.
    while (fib3 > 1) {

        // Calculate the position to inspect.
        const index = Math.min(
            offset + fib1,
            array.length - 1
        );

        console.log(
            `Checking index ${index}: ${array[index]}`
        );

        // Target is larger.
        if (array[index] < target) {

            // Move the search range right.
            fib3 = fib2;
            fib2 = fib1;
            fib1 = fib3 - fib2;

            offset = index;
        }

        // Target is smaller.
        else if (array[index] > target) {

            // Move the search range left.
            fib3 = fib1;
            fib2 = fib2 - fib1;
            fib1 = fib3 - fib2;
        }

        // Target found.
        else {

            return index;
        }
    }

    // Check the final remaining element.
    // Finish code to practice syntax.
    if (
        fib2 &&
        offset + 1 < array.length &&
        array[offset + 1] === target
    ) {
        return offset + 1;
    }

    // Target does not exist.
    return -1;
}


// ==========================================
// RUN THE SEARCH
// ==========================================

const target = 90;

const result = fibonacciBinarySearch(
    rockets,
    target
);


// ==========================================
// DISPLAY RESULT
// ==========================================

if (result !== -1) {

    console.log(
        `Target ${target} found at index ${result}.`
    );

} else {

    console.log(
        `Target ${target} was not found.`
    );
}
