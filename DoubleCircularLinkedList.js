// ==========================================
// 5. DOUBLY CIRCULAR LINKED LIST
// ==========================================
// CircularDoubleNode
class CircularDoubleNode {
// constructor(value)
// this.value = value;
// this.prev = null
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class DoublyCircularList {
  // this.head = null;
  // this.tail = null
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Add a node.
    // append(value)
    append(value) {
      
        const node = new CircularDoubleNode(value);

        // First node.
        if (this.head === null) {
            this.head = node;
            this.tail = node;

            // Circular connections.
            node.next = node;
            node.prev = node;

            return;
        }

        // Connect new node to tail.
        node.prev = this.tail;
        node.next = this.head;

        // Connect old tail to new node.
        this.tail.next = node;

        // Connect head backward to new node.
        this.head.prev = node;

        // New node becomes tail.
        this.tail = node;
    }

    // Display forward.
    displayForward() {
        if (this.head === null) {
            return;
        }

        let current = this.head;
        let result = [];

        do {
            result.push(current.value);
            current = current.next;
        } while (current !== this.head);

        console.log(
            "Forward:",
            result.join(" <-> ")
        );

        console.log(
            `Back to ${this.head.value}`
        );
    }

    // Display backward.
    displayBackward() {
        if (this.tail === null) {
            return;
        }

        let current = this.tail;
        let result = [];

        do {
            result.push(current.value);
            current = current.prev;
        } while (current !== this.tail);

        console.log(
            "Backward:",
            result.join(" <-> ")
        );

        console.log(
            `Back to ${this.tail.value}`
        );
    }

    // Move head forward.
    next() {
        if (this.head === null) return;

        this.head = this.head.next;
        this.tail = this.tail.next;
    }

    // Move head backward.
    previous() {
        if (this.head === null) return;

        this.head = this.head.prev;
        this.tail = this.tail.prev;
    }
}

const doublyCircular =
    new DoublyCircularList();

doublyCircular.append("Earth");
doublyCircular.append("Moon");
doublyCircular.append("Mars");
doublyCircular.append("Jupiter");

doublyCircular.displayForward();
doublyCircular.displayBackward();

console.log("\nMove Forward:");

doublyCircular.next();

doublyCircular.displayForward();

console.log("\nMove Backward:");

doublyCircular.previous();

doublyCircular.displayForward();
