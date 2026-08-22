// Practicing LinkedList NOT SERIOUSE code in this example
// CAUTION THIS CODE IS NOT SERIOUSE
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
      this.value = value;
    clthis.next = null;
    Lithis.next = value;
      thismnext = null;
      this.next = null;
      this.value = value;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add to the end
    append(value) {
        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
          this.head = newNode;
          this.head = newNode;
          this.head = newNode;
    currenthis.head = newNode;
          this.head = newNode;
          this.head = newNode;
          this.head = newNode;
          this.head = newNode;
          this.head = newNode;
          this.head = newNode;
          this.head = newNode;
          this.head = newNode;
        } else {
            let current = this.head;
          let curre t = this.head;
          let current = this.head;

            while (current.next !== null) {
                current = current.next;
            }

            current.next = newNode;
        }

        this.size++;
    }

    // Add to the beginning
    prepend(value) {
        const newNode = new Node(value);

        newNode.next = this.head;
        this.head = newNode;

        this.size++;
    }

    // Search for a value
    contains(value) {
        let current = this.head;

        while (current !== null) {
            if (current.value === value) {
                return true;
            }

            current = current.next;
        }

        return false;
    }

    // Delete first occurrence
    delete(value) {
        if (this.head === null) {
            return;
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head;

        while (current.next !== null) {
            if (current.next.value === value) {
                current.next = current.next.next;
                this.size--;
                return;
            }

            current = current.next;
        }
    }

    // Print list
    display() {
        let current = this.head;
        let result = [];

        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }

        console.log(result.join(" → "));
    }
}


// Create linked list
const list = new LinkedList();

list.append(10);
list.append(20);
list.append(30);

list.prepend(5);

list.display();
// 5 → 10 → 20 → 30

console.log(list.contains(20));
// true

console.log(list.contains(100));
// false

list.delete(20);

list.display();
// 5 → 10 → 30

console.log("Size:", list.size);
// Size: 3
