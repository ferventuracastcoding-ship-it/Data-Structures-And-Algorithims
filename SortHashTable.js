// ==========================================================
// HASH TABLE + SORTING ALGORITHM
// JavaScript
// ==========================================================

// Create a HashTable class
class HashTable {

    // Constructor creates the table
    constructor(size = 10) {
        this.size = size;
        this.table = Array.from(
            { length: size },
            () => []
        );
    }

    // Hash function converts a key into an index
    hash(key) {
        let hashValue = 0;

        // Loop through every character
        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i);
        }

        // Keep the index inside the table
        return hashValue % this.size;
    }

    // Insert a key/value pair
    set(key, value) {
        const index = this.hash(key);

        // Add the pair to the bucket
        this.table[index].push({
            key: key,
            value: value
        });
    }

    // Get a value from the hash table
    get(key) {
        const index = this.hash(key);

        // Search the bucket
        for (const item of this.table[index]) {
            if (item.key === key) {
                return item.value;
            }
        }

        // Key was not found
        return undefined;
    }

    // Convert the hash table into an array
    entries() {
        const result = [];

        // Visit every bucket
        for (const bucket of this.table) {

            // Visit every item
            for (const item of bucket) {
                result.push(item);
            }
        }

        return result;
    }
}


// ==========================================================
// MERGE SORT
// ==========================================================

// Merge two sorted arrays
function merge(left, right) {

    const result = [];

    let i = 0;
    let j = 0;

    // Compare values from both arrays
    while (i < left.length && j < right.length) {

        if (left[i].value <= right[j].value) {

            result.push(left[i]);

            i++;

        } else {

            result.push(right[j]);

            j++;
        }
    }

    // Add remaining left values
    while (i < left.length) {

        result.push(left[i]);

        i++;
    }

    // Add remaining right values
    while (j < right.length) {

        result.push(right[j]);

        j++;
    }

    return result;
}


// Recursive Merge Sort
function mergeSort(array) {

    // Base case
    if (array.length <= 1) {
        return array;
    }

    // Find the middle
    const middle = Math.floor(array.length / 2);

    // Split the array
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Recursively sort both halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Merge the sorted halves
    return merge(sortedLeft, sortedRight);
}


// ==========================================================
// CREATE HASH TABLE
// ==========================================================

const marsTable = new HashTable(10);


// Insert Mars missions
marsTable.set("Mars", 500);
marsTable.set("Phobos", 150);
marsTable.set("Deimos", 300);
marsTable.set("Olympus", 900);
marsTable.set("Valles", 450);
marsTable.set("Ares", 700);
marsTable.set("Hellas", 200);


// Display original hash table
console.log("ORIGINAL HASH TABLE");
console.log(marsTable.table);


// ==========================================================
// SORT HASH TABLE
// ==========================================================

// Get all entries
const entries = marsTable.entries();

// Sort entries using Merge Sort
const sortedEntries = mergeSort(entries);


// Display sorted results
console.log("SORTED HASH TABLE");

for (const item of sortedEntries) {

    console.log(
        `${item.key}: ${item.value}`
    );
}
