class GraphNode {
  constructor(val) {
    this.val = val;
    this.neighbors = [];
  }
}

class Graph {
  constructor() {
    this.adjList = new Object();
    // Code goes here ...
  }

  addVertex(vertex) {
    // Code goes here ...
    // this.adjList[vertex] = new GraphNode(vertex);
    if(!this.adjList[vertex]) this.adjList[vertex] = []
  }

  addEdges(srcValue, destValue) {
    // Code goes here ...
    if (!this.adjList[srcValue]) this.addVertex(srcValue);
    // console.log(this.addVertex(srcValue))
    if(!this.adjList[destValue]) this.addVertex(destValue)

    let src = this.adjList[srcValue]
    // console.log(src, 'src')
    src.push(destValue);
    let dest = this.adjList[destValue]
    // console.log(dest, 'dest')
    dest.push(srcValue);
    // console.log(this.adjList, 'adj list')
  }

  buildGraph(edges) {
    // let [src, dest] = edges;
    // if (!this.adjList[src]) this.addVertex(src);
    // if(!this.adjList[destValue]) this.addVertex(dest);
    edges.forEach((array) => {
      if(array.length === 1) {
        this.addVertex(array[0])
      } else {
        this.addEdges(array[0], array[1])
      }
    })
    return this.adjList
    // Code goes here ...
  }

  breadthFirstTraversal(startingVertex) {
    // Code goes here ...
    let result = [];

    let queue = [startingVertex];

    let visited = {};
    let current;
    visited[startingVertex] = true;

    while(queue.length) {
      current = queue.shift();
      result.push(current);
      // console.log(current, 'current')
      // console.log(this.adjList[current], 'current in list')
      this.adjList[current].forEach((neighbor) => {
        if(!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor)
        }
      })
    }
    return result;
  }

  depthFirstTraversalIterative(startingVertex) {
    // Code goes here ...
    let stack = [];
    let result = [];
    let visited = {};
    stack.push(startingVertex);
    visited[startingVertex] = true;

    while(stack.length) {
      let next = stack.pop();
      result.push(next)

      this.adjList[next].forEach((neighbor) => {
        if(!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor)
        }
      })
    }
    return result

  }


  depthFirstTraversalRecursive(startingVertex, visited = new Set(), vertices = []) {
    if (!startingVertex.length) return;
    visited[startingVertex] = true;
    vertices.push(startingVertex);

    this.adjList[startingVertex].forEach(neighbor => {
      if (!visited[neighbor]) {
        return this.depthFirstTraversalRecursive(neighbor, visited, vertices);
      }
    });
    return vertices;
  }
}

const edges =
            [['a', 'b'],
            ['a', 'c'],
            ['a', 'd'],
            ['d', 'g'],
            ['b', 'c'],
            ['b', 'e'],
            ['c', 'f'],
            ['c', 'g'],
            ['f', 'g'],
            ['h']]
const newGraph = new Graph()
console.log(newGraph.buildGraph(edges))
console.log(newGraph.depthFirstTraversalRecursive('a'))

module.exports = {
  Graph
};
