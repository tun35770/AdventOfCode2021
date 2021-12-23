const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 9 - Smoke Basin/day9.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

async function main(){
    
    await readInput();
    let heightMap = parseInput();
    
    //findLowestPoints(heightMap);  //Part 1

    findBasins(heightMap)           //Part 2
}

var visited = new Map();
main();

//finds the lowest points of the heightMap and calculates the
//total risk level (risk = height + 1 for each low point)
function findLowestPoints(heightMap){
    let totalRiskLevel = 0;

    for(let i = 0; i < heightMap.length; i++){
        for(let j = 0; j < heightMap[i].length; j++){
            let row = heightMap[i];
            let location = row[j];
            
            let locationsToCompare = [];
            if(i > 0)   
                locationsToCompare.push(heightMap[i-1][j]);
            if(i < heightMap.length - 1)    
                locationsToCompare.push(heightMap[i+1][j]);
            if(j > 0)   
                locationsToCompare.push(heightMap[i][j-1]);
            if(j < row.length)  
                locationsToCompare.push(heightMap[i][j+1]);

            let isLowest = true;
            locationsToCompare.forEach(adjLocation => {
                if(location >= adjLocation)
                    isLowest = false;
            });

            if(isLowest)
                totalRiskLevel += location+1;
        }

    }

    console.log(`Total Risk level: ${totalRiskLevel}`);
}

//Finds sizes of largest 3 basins in the heightMap
function findBasins(heightMap){
    let first = 0, second = 0, third = 0;
    let sizes = [];

    //iterate through rows
    for(let i = 0; i < heightMap.length; i++){
        //iterate through each col in this row
        for(let j = 0; j < heightMap[0].length; j++){
           //9's arent part of basin, so dont check em
            if(heightMap[i][j] != 9)  {  
                let size = checkForBasin(heightMap, i, j);
                sizes.push(size);

                if(size > first){
                    third = second;
                    second = first;
                    first = size;
                }
                else if(size > second){
                    third = second;
                    second = size;
                }
                else if(size > third)
                    third = size;
            }
        }
    }

    console.log(`Largest Three Basins: 1) ${first} 2) ${second} 3) ${third}`);
    console.log(`Product: ${first*second*third}`);
}

//recursive func that returns size of the basin to the main call
function checkForBasin(heightMap, row, col){
    
    if(heightMap[row][col] == 9)
        return 0;

    if(visited.get( heightMap.length * row + col))
        return 0;

    //mark as visited
    visited.set(heightMap.length * row + col, 1);


    let size = 1;
    if(row > 0) //dont pass negative row
        size += checkForBasin(heightMap, row - 1, col);
    if(row < heightMap.length - 1)    //dont pass out of bounds
        size += checkForBasin(heightMap, row + 1, col);
    if(col > 0)   //dont pass negative col
        size += checkForBasin(heightMap, row, col - 1);
    if(col < heightMap[0].length - 1)  //dont pass out of bounds
        size += checkForBasin(heightMap, row, col + 1);

    return size;
}

function parseInput(){

    //parse input 
    let heightMap = [];
    input.forEach(line => {
        let row = line.split('');
        row = row.map(function (x) {
            return parseInt(x);
        })
        heightMap.push(row);
    });

    
    return heightMap;
}