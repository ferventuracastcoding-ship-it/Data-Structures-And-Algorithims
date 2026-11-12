class HashTable {
    constructor(size = 10) {
        this.table = new Array(size);
        this.size = size;
    }

    // Convert a key into an array index
    hash(key) {
        let total = 0;

        for (let i = 0; i < key.length; i++) {
            total += key.charCodeAt(i);
        }

        return total % this.size;
    }

    set(key, value) {
        const index = this.hash(key);

        if (!this.table[index]) {
            this.table[index] = [];
        }

        this.table[index].push([key, value]);
    }

    get(key) {
        const index = this.hash(key);

        const bucket = this.table[index];

        if (!bucket) {
            return undefined;
        }

        for (const [storedKey, value] of bucket) {
            if (storedKey === key) {
                return value;
            }
        }

        return undefined;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    delete(key) {
        const index = this.hash(key);

        const bucket = this.table[index];

        if (!bucket) {
            return false;
        }

        const position = bucket.findIndex(
            ([storedKey]) => storedKey === key
        );

        if (position === -1) {
            return false;
        }

        bucket.splice(position, 1);
        return true;
    }
}
