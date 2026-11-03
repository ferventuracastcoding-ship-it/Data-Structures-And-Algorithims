// ============================================
// 1. COUNT DOWN
// ============================================

function countDown(n) {
    if (n <= 0) {
        console.log("Blast off!");
        return;
    }

    console.log(n);
    countDown(n - 1);
}

countDown(5);


// ============================================
// 2. COUNT UP
// ============================================

function countUp(n, current = 1) {
    if (current > n) return;

    console.log(current);
    countUp(n, current + 1);
}

countUp(5);


// ============================================
// 3. FACTORIAL
// ============================================

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

console.log("Factorial:", factorial(5));


// ============================================
// 4. SUM OF NUMBERS
// ============================================

function sumNumbers(n) {
    if (n === 0) {
        return 0;
    }

    return n + sumNumbers(n - 1);
}

console.log("Sum:", sumNumbers(10));


// ============================================
// 5. POWER
// ============================================

function power(base, exponent) {
    if (exponent === 0) {
        return 1;
    }

    return base * power(base, exponent - 1);
}

console.log("Power:", power(2, 5));


// ============================================
// 6. FIBONACCI
// ============================================

function fibonacci(n) {
    if (n <= 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci:", fibonacci(10));


// ============================================
// 7. REVERSE A STRING
// ============================================

function reverseString(str) {
    if (str.length <= 1) {
        return str;
    }

    return reverseString(str.slice(1)) + str[0];
}

console.log(
    "Reverse:",
    reverseString("JavaScript")
);


// ============================================
// 8. CHECK PALINDROME
// ============================================

function isPalindrome(str) {
    if (str.length <= 1) {
        return true;
    }

    if (str[0] !== str[str.length - 1]) {
        return false;
    }

    return isPalindrome(str.slice(1, -1));
}

console.log(
    "Palindrome:",
    isPalindrome("racecar")
);


// ============================================
// 9. SUM ARRAY
// ============================================

function sumArray(array, index = 0) {
    if (index === array.length) {
        return 0;
    }

    return array[index] + sumArray(array, index + 1);
}

console.log(
    "Array Sum:",
    sumArray([10, 20, 30, 40])
);


// ============================================
// 10. FIND MAXIMUM
// ============================================

function findMax(array, index = 0, max = -Infinity) {
    if (index === array.length) {
        return max;
    }

    if (array[index] > max) {
        max = array[index];
    }

    return findMax(array, index + 1, max);
}

console.log(
    "Maximum:",
    findMax([5, 90, 12, 45, 100, 3])
);


// ============================================
// 11. BINARY SEARCH
// ============================================

function binarySearch(array, target, left = 0, right = array.length - 1) {

    if (left > right) {
        return -1;
    }

    const middle = Math.floor((left + right) / 2);

    if (array[middle] === target) {
        return middle;
    }

    if (target < array[middle]) {
        return binarySearch(
            array,
            target,
            left,
            middle - 1
        );
    }

    return binarySearch(
        array,
        target,
        middle + 1,
        right
    );
}

console.log(
    "Binary Search:",
    binarySearch([10, 20, 30, 40, 50, 60], 40)
);


// ============================================
// 12. RECURSIVE LINEAR SEARCH
// ============================================

function recursiveSearch(array, target, index = 0) {

    if (index >= array.length) {
        return -1;
    }

    if (array[index] === target) {
        return index;
    }

    return recursiveSearch(
        array,
        target,
        index + 1
    );
}

console.log(
    "Linear Search:",
    recursiveSearch(["Mars", "Moon", "Earth", "Saturn"], "Mars")
);


// ============================================
// 13. MERGE SORT
// ============================================

function mergeSort(array) {

    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);

    const left = mergeSort(
        array.slice(0, middle)
    );

    const right = mergeSort(
        array.slice(middle)
    );

    return merge(left, right);
}


function merge(left, right) {

    const result = [];

    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {

        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return [
        ...result,
        ...left.slice(i),
        ...right.slice(j)
    ];
}

console.log(
    "Merge Sort:",
    mergeSort([8, 3, 5, 1, 9, 2])
);


// ============================================
// 14. QUICK SORT
// ============================================

function quickSort(array) {

    if (array.length <= 1) {
        return array;
    }

    const pivot = array[array.length - 1];

    const smaller = [];
    const larger = [];

    for (let i = 0; i < array.length - 1; i++) {

        if (array[i] < pivot) {
            smaller.push(array[i]);
        } else {
            larger.push(array[i]);
        }
    }

    return [
        ...quickSort(smaller),
        pivot,
        ...quickSort(larger)
    ];
}

console.log(
    "Quick Sort:",
    quickSort([7, 2, 9, 1, 5, 3])
);


// ============================================
// 15. RECURSIVE LINKED LIST
// ============================================

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function printLinkedList(node) {

    if (node === null) {
        return;
    }

    console.log(node.value);

    printLinkedList(node.next);
}

const first = new Node("Earth");
first.next = new Node("Moon");
first.next.next = new Node("Mars");
first.next.next.next = new Node("Jupiter");

printLinkedList(first);


// ============================================
// 16. REVERSE LINKED LIST
// ============================================

function reverseLinkedList(node) {

    if (node === null || node.next === null) {
        return node;
    }

    const newHead = reverseLinkedList(node.next);

    node.next.next = node;
    node.next = null;

    return newHead;
}

const head = new Node("A");
head.next = new Node("B");
head.next.next = new Node("C");

const reversed = reverseLinkedList(head);

printLinkedList(reversed);


// ============================================
// 17. TREE TRAVERSAL
// ============================================

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function inorder(node) {

    if (node === null) {
        return;
    }

    inorder(node.left);

    console.log(node.value);

    inorder(node.right);
}

const tree = new TreeNode(10);

tree.left = new TreeNode(5);
tree.right = new TreeNode(20);

tree.left.left = new TreeNode(2);
tree.left.right = new TreeNode(7);

tree.right.left = new TreeNode(15);
tree.right.right = new TreeNode(25);

inorder(tree);


// ============================================
// 18. GREATEST COMMON DIVISOR
// ============================================

function gcd(a, b) {

    if (b === 0) {
        return a;
    }

    return gcd(b, a % b);
}

console.log(
    "GCD:",
    gcd(48, 18)
);


// ============================================
// 19. TOWER OF HANOI
// ============================================

function towerOfHanoi(n, from, to, auxiliary) {

    if (n === 1) {

        console.log(
            `Move disk 1 from ${from} → ${to}`
        );

        return;
    }

    towerOfHanoi(
        n - 1,
        from,
        auxiliary,
        to
    );

    console.log(
        `Move disk ${n} from ${from} → ${to}`
    );

    towerOfHanoi(
        n - 1,
        auxiliary,
        to,
        from
    );
}

towerOfHanoi(3, "A", "C", "B");


// ============================================
// 20. SUDOKU BACKTRACKING
// ============================================

function solveSudoku(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                for (let number = 1; number <= 9; number++) {

                    if (
                        canPlaceNumber(
                            board,
                            row,
                            col,
                            number
                        )
                    ) {

                        board[row][col] = number;

                        if (solveSudoku(board)) {
                            return true;
                        }

                        // Backtrack
                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}


function canPlaceNumber(board, row, col, number) {

    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === number) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === number) {
            return false;
        }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r++) {

        for (let c = 0; c < 3; c++) {

            if (
                board[boxRow + r][boxCol + c] === number
            ) {
                return false;
            }
        }
    }

    return true;
}

const sudoku = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],

    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],

    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
];

solveSudoku(sudoku);

console.table(sudoku);
