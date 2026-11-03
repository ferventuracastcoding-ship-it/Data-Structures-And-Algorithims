
// ==========================================
// 51. FIBONACCI DYNAMIC PROGRAMMING
// TOP-DOWN MEMOIZATION
// ==========================================

function fibonacciMemo(n, memo = {}) {

    // Base cases
    if (n <= 1) {
        return n;
    }

    // Check previously calculated result
    if (memo[n] !== undefined) {
        return memo[n];
    }

    // Calculate and store result
    memo[n] =
        fibonacciMemo(n - 1, memo) +
        fibonacciMemo(n - 2, memo);

    return memo[n];
}

// Generate first 20 Fibonacci numbers
for (let i = 0; i < 20; i++) {
    console.log(`F(${i}) = ${fibonacciMemo(i)}`);
}

// Calculate larger Fibonacci number
console.log("Fibonacci 40:", fibonacciMemo(40));
