// ==========================================
// 4. CIRCULAR LINKED LIST
// ==========================================
// Circular Node
class CircularNode {
    constructor(value) {
     // this.value = value;
     // this.next = null;
        this.value = value;
        this.next = null;
    }
}
// Circular Linked List
class CircularLinkedList {
    constructor() {
      // this.head = null;
      // this.tail = null;
        this.head = null;
        this.tail = null;
    }

    // Add a node. Append with a value parameter
    append(value) {
        const node = new CircularNode(value);
        // this.head === null
        // this.head = node;
        // this.tail = node;
        if (this.head === null) {
            this.head = node;
            this.tail = node;

            // The only node points to itself.
            // node.next = this.head
            node.next = this.head;

            return;
        }
        // node.next = this.head,
        // this.tail.next = node
        // this.tail = node
        // Add after the current tail.
        node.next = this.head;
        this.tail.next = node;
        this.tail = node;
    }

    // Display exactly one complete cycle.
    // this.head === null
    display() {
        if (this.head === null) {
            console.log("List is empty.");
            return;
        }
     // let current = this.head;
     // let result = [];
        let current = this.head;
        let result = [];
         // result.push(current.value);
         // current = current.next;
        do {
            result.push(current.value);
            current = current.next;
        } while (current !== this.head);

        console.log(
         // result.join(" -> ") +
         // " -> back to " +
         // this.head.value
            result.join(" -> ") +
            " -> back to " +
            this.head.value
        );
    }

    // Move around the circle.
    rotate() {
     // this.head === null) return;
        if (this.head === null) return;
     // this.head = this.head.next;
     // this.tail = this.tail.next;
        this.head = this.head.next;
        this.tail = this.tail.next;
    }
}
// Circular object, Circular Linked List
const circular = new CircularLinkedList();

circular.append("Earth");
circular.append("Mars");
circular.append("Jupiter");
circular.append("Saturn");
// circular.display
circular.display();

console.log("\nRotate:");
// Circular.rotate
circular.rotate();
// circular.display
circular.display();
