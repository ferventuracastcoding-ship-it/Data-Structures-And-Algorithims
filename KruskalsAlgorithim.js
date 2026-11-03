
// ==========================================
// KRUSKAL'S MINIMUM SPANNING TREE
// ==========================================

// Union-Find (Disjoint Set) data structure
class UnionFind {
    constructor(size) {
      // calling this keyword with an array
        this.parent = Array.from(
            { length: size },
            (_, i) => i
        );

        this.rank = new Array(size).fill(0);
    }

    // Find the root of a vertex
    find(vertex) {
        if (this.parent[vertex] !== vertex) {
            this.parent[vertex] = this.find(
                this.parent[vertex]
            );
        }

        return this.parent[vertex];
    }

    // Connect two separate components
    union(vertex1, vertex2) {
        let root1 = this.find(vertex1);
        let root2 = this.find(vertex2);

        // Already connected: adding this edge creates a cycle
        if (root1 === root2) {
            return false;
        }

        // Union by rank
        if (this.rank[root1] < this.rank[root2]) {
            this.parent[root1] = root2;
        } else if (this.rank[root1] > this.rank[root2]) {
            this.parent[root2] = root1;
        } else {
            this.parent[root2] = root1;
            this.rank[root1]++;
        }

        return true;
    }
}

// Kruskal's Algorithm
function kruskal(vertices, edges) {

    // Sort edges by ascending weight
    edges.sort((a, b) => a.weight - b.weight);

    // Create Union-Find structure
    const uf = new UnionFind(vertices.length);

    // Store minimum spanning tree
    const mst = [];

    let totalWeight = 0;

    // Process edges from smallest to largest
    for (const edge of edges) {

        const { from, to, weight } = edge;

        // Add edge only if it does not create a cycle
        if (uf.union(from, to)) {

            mst.push(edge);

            totalWeight += weight;

            console.log(
                `Added: ${from} -> ${to}, Weight: ${weight}`
            );

            // MST has V - 1 edges
            if (mst.length === vertices.length - 1) {
                break;
            }
        }
    }

    // Check whether all vertices are connected
    if (mst.length !== vertices.length - 1) {
        throw new Error("Graph is disconnected. No spanning tree exists.");
    }

    return {
        minimumSpanningTree: mst,
        totalWeight: totalWeight
    };
}

// ==========================================
// GRAPH DATA
// ==========================================

const vertices = ["A", "B", "C", "D", "E", "F"];

const edges = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 3 },
    { from: 1, to: 2, weight: 1 },
    { from: 1, to: 3, weight: 2 },
    { from: 2, to: 3, weight: 4 },
    { from: 2, to: 4, weight: 5 },
    { from: 3, to: 4, weight: 2 },
    { from: 3, to: 5, weight: 3 },
    { from: 4, to: 5, weight: 6 }
];

// ==========================================
// RUN KRUSKAL'S ALGORITHM
// ==========================================

const result = kruskal(vertices, edges);

console.log("\nMinimum Spanning Tree:");

result.minimumSpanningTree.forEach(edge => {
    console.log(
        `${vertices[edge.from]} - ${vertices[edge.to]} : ${edge.weight}`
    );
});

console.log("\nTotal Minimum Weight:", result.totalWeight);
