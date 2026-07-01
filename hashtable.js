/**********************************************************************
 * HASH TABLE IMPLEMENTATION SUITE (JavaScript)
 * Includes:
 *  - Separate Chaining Hash Table
 *  - Open Addressing Hash Table (Linear Probing)
 *  - Double Hashing
 *  - HashSet
 *  - HashMap Wrapper
 *  - LRU Cache
 *  - Benchmarks
 *  - Tests / Examples
 **********************************************************************/

/******************************
 * UTILITY: HASH FUNCTIONS
 ******************************/

class HashUtils {
    static hashString(key, size) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % size;
        }
        return hash;
    }

    static hashNumber(key, size) {
        return key % size;
    }

    static hash(key, size) {
        if (typeof key === "number") return HashUtils.hashNumber(key, size);
        return HashUtils.hashString(String(key), size);
    }

    static secondHash(key, size) {
        let h = 0;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            h = (h * 17 + str.charCodeAt(i)) % size;
        }
        return h || 1;
    }
}

/******************************
 * 1. HASH TABLE (SEPARATE CHAINING)
 ******************************/

class HashTableChaining {
    constructor(size = 53) {
        this.size = size;
        this.buckets = Array.from({ length: size }, () => []);
        this.count = 0;
    }

    set(key, value) {
        const index = HashUtils.hash(key, this.size);
        const bucket = this.buckets[index];

        for (let item of bucket) {
            if (item.key === key) {
                item.value = value;
                return;
            }
        }

        bucket.push({ key, value });
        this.count++;

        if (this.count / this.size > 0.75) {
            this.resize();
        }
    }

    get(key) {
        const index = HashUtils.hash(key, this.size);
        const bucket = this.buckets[index];

        for (let item of bucket) {
            if (item.key === key) return item.value;
        }

        return undefined;
    }

    remove(key) {
        const index = HashUtils.hash(key, this.size);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }

        return false;
    }

    resize() {
        const old = this.buckets;
        this.size *= 2;
        this.buckets = Array.from({ length: this.size }, () => []);
        this.count = 0;

        for (let bucket of old) {
            for (let item of bucket) {
                this.set(item.key, item.value);
            }
        }
    }

    keys() {
        let keys = [];
        for (let bucket of this.buckets) {
            for (let item of bucket) keys.push(item.key);
        }
        return keys;
    }

    values() {
        let values = [];
        for (let bucket of this.buckets) {
            for (let item of bucket) values.push(item.value);
        }
        return values;
    }
}

/******************************
 * 2. HASH TABLE (LINEAR PROBING)
 ******************************/

class HashTableLinearProbing {
    constructor(size = 53) {
        this.size = size;
        this.table = Array(size).fill(null);
        this.count = 0;
    }

    set(key, value) {
        let index = HashUtils.hash(key, this.size);

        while (this.table[index] !== null && this.table[index].key !== key) {
            index = (index + 1) % this.size;
        }

        this.table[index] = { key, value };
        this.count++;
    }

    get(key) {
        let index = HashUtils.hash(key, this.size);

        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                return this.table[index].value;
            }
            index = (index + 1) % this.size;
        }

        return undefined;
    }

    remove(key) {
        let index = HashUtils.hash(key, this.size);

        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                this.table[index] = null;
                this.count--;
                return true;
            }
            index = (index + 1) % this.size;
        }

        return false;
    }
}

/******************************
 * 3. DOUBLE HASHING TABLE
 ******************************/

class HashTableDoubleHashing {
    constructor(size = 53) {
        this.size = size;
        this.table = Array(size).fill(null);
    }

    set(key, value) {
        let index = HashUtils.hash(key, this.size);
        let step = HashUtils.secondHash(key, this.size);

        while (this.table[index] !== null && this.table[index].key !== key) {
            index = (index + step) % this.size;
        }

        this.table[index] = { key, value };
    }

    get(key) {
        let index = HashUtils.hash(key, this.size);
        let step = HashUtils.secondHash(key, this.size);

        while (this.table[index] !== null) {
            if (this.table[index].key === key) return this.table[index].value;
            index = (index + step) % this.size;
        }

        return undefined;
    }
}

/******************************
 * 4. HASH SET
 ******************************/

class HashSet {
    constructor() {
        this.map = new HashTableChaining();
    }

    add(value) {
        this.map.set(value, true);
    }

    has(value) {
        return this.map.get(value) !== undefined;
    }

    delete(value) {
        return this.map.remove(value);
    }
}

/******************************
 * 5. HASH MAP WRAPPER
 ******************************/

class HashMap {
    constructor() {
        this.table = new HashTableChaining();
    }

    put(key, value) {
        this.table.set(key, value);
    }

    get(key) {
        return this.table.get(key);
    }

    remove(key) {
        return this.table.remove(key);
    }
}

/******************************
 * 6. LRU CACHE USING HASH MAP
 ******************************/

class LRUCache {
    constructor(capacity = 5) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key) {
        if (!this.map.has(key)) return -1;

        let value = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        } else if (this.map.size >= this.capacity) {
            const firstKey = this.map.keys().next().value;
            this.map.delete(firstKey);
        }

        this.map.set(key, value);
    }
}

/******************************
 * 7. BENCHMARK UTILITIES
 ******************************/

function benchmarkHashTable() {
    const ht = new HashTableChaining();
    console.time("insert");
    for (let i = 0; i < 10000; i++) {
        ht.set("key" + i, i);
    }
    console.timeEnd("insert");

    console.time("lookup");
    for (let i = 0; i < 10000; i++) {
        ht.get("key" + i);
    }
    console.timeEnd("lookup");
}

/******************************
 * 8. TESTS
 ******************************/

function runTests() {
    const ht = new HashTableChaining();

    ht.set("name", "Alice");
    ht.set("age", 25);
    ht.set("job", "Engineer");

    console.log(ht.get("name")); // Alice
    console.log(ht.get("age"));  // 25

    ht.remove("age");
    console.log(ht.get("age"));  // undefined

    const set = new HashSet();
    set.add(10);
    set.add(20);

    console.log(set.has(10)); // true
    console.log(set.has(99)); // false

    const cache = new LRUCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("c", 3);

    console.log(cache.get("a")); // -1 (evicted)
}

/******************************
 * 9. DEMO EXECUTION
 ******************************/

runTests();
benchmarkHashTable();

/**********************************************************************
 * END OF FILE
 * (You can extend this with:
 *  - Robin Hood hashing
 *  - Cuckoo hashing
 *  - Persistent hash maps
 *  - Trie integration
 *  - Bloom filters
 *  - etc.)
 **********************************************************************/