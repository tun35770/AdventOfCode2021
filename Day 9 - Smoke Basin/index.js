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
    
    findLowestPoints(heightMap);
}

main();

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