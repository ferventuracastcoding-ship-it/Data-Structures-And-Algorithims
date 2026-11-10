// ==========================================
// LINKED LIST - 10 FUNCTIONS
// SATURN SPACE STATION NETWORK
// ==========================================
// 1. NODE
// ==========================================
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
// ==========================================
// 2. LINKED LIST
// ==========================================
class LinkedList {

    constructor() {
        this.head = null;
    }
    // ======================================
    // FUNCTION 1: APPEND
    // Add a node to the end
    // ======================================
    append(value) {

        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
            return;
        }

        let current = this.head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }
    // ======================================
    // FUNCTION 2: PREPEND
    // Add a node to the beginning
    // ======================================
    prepend(value) {

        const newNode = new Node(value);

        newNode.next = this.head;

        this.head = newNode;
    }
    // ======================================
    // FUNCTION 3: FIND
    // Search for a value
    // ======================================
    find(value) {

        let current = this.head;

        while (current !== null) {

            if (current.value === value) {
                return current;
            }

            current = current.next;
        }

        return null;
    }
    // ======================================
    // FUNCTION 4: REMOVE
    // Remove a node by value
    // ======================================
    remove(value) {

        if (this.head === null) {
            return;
        }

        // Remove head
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;

        while (current.next !== null) {

            if (current.next.value === value) {

                current.next =
                    current.next.next;

                return;
            }

            current = current.next;
        }
    }
    // ======================================
    // FUNCTION 5: DISPLAY
    // Print the linked list
    // ======================================
    display() {

        let current = this.head;

        let result = "";

        while (current !== null) {

            result += current.value;

            if (current.next !== null) {
                result += " → ";
            }

            current = current.next;
        }

        result += " → null";

        console.log(result);
    }
    // ======================================
    // FUNCTION 6: COUNT
    // Count all nodes
    // ======================================
    count() {

        let current = this.head;

        let total = 0;

        while (current !== null) {

            total++;

            current = current.next;
        }

        return total;
    }
    // ======================================
    // FUNCTION 7: REVERSE
    // Reverse the linked list
    // ======================================
    reverse() {

        let previous = null;

        let current = this.head;

        while (current !== null) {

            let nextNode = current.next;

            current.next = previous;

            previous = current;

            current = nextNode;
        }

        this.head = previous;
    }
    // ======================================
    // FUNCTION 8: GET
    // Get a node by index
    // ======================================
    get(index) {

        let current = this.head;

        let position = 0;

        while (current !== null) {

            if (position === index) {
                return current.value;
            }

            position++;

            current = current.next;
        }

        return null;
    }
    // ======================================
    // FUNCTION 9: INSERT AT INDEX
    // ======================================
    insertAt(index, value) {

        const newNode = new Node(value);

        // Insert at beginning
        if (index === 0) {

            newNode.next = this.head;

            this.head = newNode;

            return;
        }

        let current = this.head;

        let position = 0;

        while (
            current !== null &&
            position < index - 1
        ) {

            current = current.next;

            position++;
        }

        if (current === null) {
            return;
        }

        newNode.next = current.next;

        current.next = newNode;
    }


    // ======================================
    // FUNCTION 10: IS EMPTY
    // Check whether list is empty
    // ======================================

    isEmpty() {

        return this.head === null;
    }
}
// ==========================================
// CREATE SATURN STATION LINKED LIST
// ==========================================
const stations = new LinkedList();
// ==========================================
// ADD 10 SPACE STATIONS
// ==========================================
stations.append("Saturn Station 01");
stations.append("Saturn Station 02");
stations.append("Saturn Station 03");
stations.append("Saturn Station 04");
stations.append("Saturn Station 05");
stations.append("Saturn Station 06");
stations.append("Saturn Station 07");
stations.append("Saturn Station 08");
stations.append("Saturn Station 09");
stations.append("Saturn Station 10");
// ==========================================
// TEST FUNCTION 1
// APPEND
// ==========================================
console.log("FUNCTION 1: APPEND");

stations.append("Titan Research Station");

stations.display();
// ==========================================
// TEST FUNCTION 2
// PREPEND
// ==========================================

console.log("\nFUNCTION 2: PREPEND");

stations.prepend("Saturn Command Station");

stations.display();
// ==========================================
// TEST FUNCTION 3
// FIND
// ==========================================
console.log("\nFUNCTION 3: FIND");

const found = stations.find(
    "Saturn Station 05"
);

console.log(
    found
        ? "Found: " + found.value
        : "Station not found"
);
// ==========================================
// TEST FUNCTION 4
// REMOVE
// ==========================================
console.log("\nFUNCTION 4: REMOVE");

stations.remove("Saturn Station 03");

stations.display();
// ==========================================
// TEST FUNCTION 5
// DISPLAY
// ==========================================
console.log("\nFUNCTION 5: DISPLAY");

stations.display();
// ==========================================
// TEST FUNCTION 6
// COUNT
// ==========================================
console.log("\nFUNCTION 6: COUNT");

console.log(
    "Total stations:",
    stations.count()
);
// ==========================================
// TEST FUNCTION 7
// REVERSE
// ==========================================
console.log("\nFUNCTION 7: REVERSE");

stations.reverse();

stations.display();
// ==========================================
// TEST FUNCTION 8
// GET
// ==========================================
console.log("\nFUNCTION 8: GET");

console.log(
    "Station at index 3:",
    stations.get(3)
);
// ==========================================
// TEST FUNCTION 9
// INSERT AT INDEX
// ==========================================
console.log("\nFUNCTION 9: INSERT AT INDEX");

stations.insertAt(
    2,
    "Saturn Science Station"
);

stations.display();
// ==========================================
// TEST FUNCTION 10
// IS EMPTY
// ==========================================
console.log("\nFUNCTION 10: IS EMPTY");

console.log(
    "Is station network empty?",
    stations.isEmpty()
);
