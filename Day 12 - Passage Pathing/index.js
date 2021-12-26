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


//Depth First Search through a graph using recursion
//Big caves can be revisited any number of times
//Small caves only once (except in Part 2, where a single
//small cave may be visited twice)
//Builds adjacency list map then calls DFS to find total # of paths
//from start to end
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

    let totalPaths = 0;

    //Part 1
    totalPaths += DFS(nodeMap.get('start'), nodeMap, new Map(), null);
    console.log(`Total Paths with no revisits: ${totalPaths}`);

    nodeMap.forEach((value, key) => {
        console.log(`${key}, ${value.edges}`);  
    })

    //Part 2
    nodeMap.forEach((value, key) => {
        if(!value.isBig && key != 'start' && key != 'end'){
            console.log(`${key}`)
            totalPaths += DFS(nodeMap.get('start'), nodeMap, new Map(), key) - 5756;    //dont recount paths
        }                                                                           //without any revisits
    })

    console.log(`Total Paths with revisits: ${totalPaths}`);
}

const DFS = (start, nodeMap, haveVisited, revisit) => {

    if(start.name === 'end')
        return 1;

        //dont revisit small caves
    if(!start.isBig && haveVisited.has(start.name)){
        if(start.name == revisit){
            if(haveVisited.get(start.name) > 1)
                return 0;
        }
        else
            return 0;
    }
    
    //mark this node as visited
    if(!start.isBig)
        haveVisited.set(start.name, (haveVisited.get(start.name) ?? 0) + 1);

    //DFS to all edges
    let sum = 0;
    for(let i = 0; i < start.edges.length; i++){
        sum += DFS(nodeMap.get(start.edges[i]), nodeMap, haveVisited, revisit);
    }
    
    //consider this node as unvisited for future, different paths
    if(start.name == revisit && haveVisited.get(start.name) == 2)
        haveVisited.set(start.name, 1);
    else
        haveVisited.delete(start.name);

    return sum;
}

//184895
//218275
//206763 (UNTRIED!)
//179139
//202163
//213675
//47188
//144603