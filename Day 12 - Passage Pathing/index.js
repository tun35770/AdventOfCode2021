const fs = require('fs');
const readline = require('readline');
const { isArgumentsObject } = require('util/types');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 12 - Passage Pathing/day12.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

async function main(){
    await readInput();
    findPaths(input);
}

main();

function findPaths(input){
    let nodeMap = new Map();

    for(let i = 0; i < input.length; i++){
        let inputTuple = input[i].split('-');

        //a -> b
        if(!nodeMap.has(inputTuple[0])){
            const adj = [];
            adj.push(inputTuple[1]);

            nodeMap.set(inputTuple[0], {
                name: inputTuple[0],
                edges: adj,
                isBig: inputTuple[0] === inputTuple[0].toUpperCase()
            });
        }
        else{   //add this edge to edges list
            nodeMap.get(inputTuple[0]).edges.push(inputTuple[1]);
        }

        //b -> a
        if(!nodeMap.has(inputTuple[1])){
            const adj = [];
            adj.push(inputTuple[0]);

            nodeMap.set(inputTuple[1], {
                name: inputTuple[1],
                edges: adj,
                isBig: inputTuple[1] === inputTuple[1].toUpperCase()
            });
        }
        else{   //add this edge to edges list
            nodeMap.get(inputTuple[1]).edges.push(inputTuple[0]);
        }
    }
    
    let totalPaths = DFS(nodeMap.get('start'), nodeMap, new Map());

    console.log(`Total Paths: ${totalPaths}`);

}

const DFS = (start, nodeMap, haveVisited) => {

    //dont revisit small caves
    if(!start.isBig && haveVisited.has(start.name))
        return 0;

    //return 1 if at end
    if(start.name === 'end')
        return 1;
    
    //mark this node as visited
    if(!start.isBig)
        haveVisited.set(start.name, 1);

    //DFS to all edges
    let sum = 0;
    for(let i = 0; i < start.edges.length; i++){
        sum += DFS(nodeMap.get(start.edges[i]), nodeMap, haveVisited);
    }
    
    //consider this node as unvisited for future, different paths
    haveVisited.delete(start.name);
    return sum;
}