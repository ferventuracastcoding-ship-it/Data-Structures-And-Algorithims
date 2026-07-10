class Dinic {
    constructor(vertices) {
        this.V = vertices;

        this.graph = Array.from(
            { length: vertices },
            () => []
        );
    }

    addEdge(from, to, capacity) {
        this.graph[from].push({
            to,
            capacity,
            flow: 0,
            reverse: this.graph[to].length
        });

        this.graph[to].push({
            to: from,
            capacity: 0,
            flow: 0,
            reverse: this.graph[from].length - 1
        });
    }


    bfs(source, sink, level) {
        level.fill(-1);
        level[source] = 0;

        let queue = [source];

        while(queue.length) {
            let node = queue.shift();

            for(let edge of this.graph[node]) {
                if(
                    level[edge.to] < 0 &&
                    edge.flow < edge.capacity
                ) {
                    level[edge.to] =
                        level[node] + 1;

                    queue.push(edge.to);
                }
            }
        }

        return level[sink] >= 0;
    }


    dfs(node, sink, pushed, level, start) {

        if(node === sink)
            return pushed;

        for(
            let i=start[node];
            i<this.graph[node].length;
            i++
        ) {

            let edge=this.graph[node][i];

            if(
                level[edge.to] === level[node]+1 &&
                edge.flow < edge.capacity
            ){

                let flow=this.dfs(
                    edge.to,
                    sink,
                    Math.min(
                        pushed,
                        edge.capacity-edge.flow
                    ),
                    level,
                    start
                );

                if(flow>0){

                    edge.flow += flow;

                    this.graph[edge.to]
                    [edge.reverse]
                    .flow -= flow;

                    return flow;
                }
            }
        }

        return 0;
    }


    maxFlow(source,sink){

        let total=0;
        let level=[];

        while(
            this.bfs(
                source,
                sink,
                level=Array(this.V)
            )
        ){

            let start=Array(this.V).fill(0);

            while(true){

                let flow=this.dfs(
                    source,
                    sink,
                    Infinity,
                    level,
                    start
                );

                if(flow===0)
                    break;

                total+=flow;
            }
        }

        return total;
    }
}


// Example
let network = new Dinic(4);

network.addEdge(0,1,10);
network.addEdge(0,2,5);
network.addEdge(1,2,15);
network.addEdge(1,3,10);
network.addEdge(2,3,10);

console.log(
    network.maxFlow(0,3)
);