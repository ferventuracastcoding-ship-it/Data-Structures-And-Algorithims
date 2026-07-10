function warshall(matrix) {
    const n = matrix.length;
    let closure = matrix.map(row => [...row]);

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                closure[i][j] =
                    closure[i][j] ||
                    (closure[i][k] && closure[k][j]);
            }
        }
    }

    return closure;

}


// Example graph
let graph = [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 1]
];

console.log(warshall(graph));