const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 11 - Dumbo Octopus/day11.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

async function main(){
    await readInput();
    //findTotalFlashes(input);  //Part 1
    checkSyncFlash(input);      //Part 2
}

let totalFlashes = 0;
main();


//for 100 steps, increments energy levels of all octopi
//then flashes if energy level > 9 for each octopus
//total # of flashes is logged
function findTotalFlashes(input){
    let map = [];
    let flashed = new Map();

    input.forEach(element => {
        map.push(element.split(''));
    });

    //increment energy level of all octopi
    for(let i = 0; i < 100; i++){
        for(let j = 0; j < map.length; j++){
            for(let k = 0; k < map[0].length; k++){
                map[j][k]++;
            }
        }

        //check for flashes
        for(let j = 0; j < map.length; j++){
            for(let k = 0; k < map[0].length; k++){
                checkFlash(map, j, k, flashed);
            }
        }
        
        //set all flashed octopus energy to 0
        for(let j = 0; j < map.length; j++){
            for(let k = 0; k < map[0].length; k++){
                if(flashed.get(map.length * j + k))
                    map[j][k] = 0;
            }
        }
        flashed.clear();
    }

    console.log(`Total Flashes: ${totalFlashes}`);
}

//checks if this octopus should flash. If so, will then check if its neighbors should flash
function checkFlash(map, i, j, flashed){
    if(i < 0 || j < 0 || i > map.length-1 || j > map[0].length-1)
        return;

    //flash!
    if(map[i][j] > 9){
        //if this octopus hasn't already flashed this step
        if(!flashed.get(map.length * i + j)){

            flashed.set(map.length * i + j, 1);
            totalFlashes++;

            if(i > 0 && j > 0)
                map[i-1][j-1]++;
            if(i > 0)
                map[i-1][j]++;
            if(i > 0 && j < map[0].length-1)
                map[i-1][j+1]++;
            if(j < map[0].length-1)
                map[i][j+1]++; 
            if(i < map.length-1 && j < map[0].length-1)
                map[i+1][j+1]++;
            if(i < map.length-1)
                map[i+1][j]++;
            if(i < map.length-1 && j > 0)
                map[i+1][j-1]++;
            if(j > 0)
                map[i][j-1]++;
                
            //clockwise from top-left
            checkFlash(map, i-1, j-1, flashed);
            checkFlash(map, i-1, j, flashed);
            checkFlash(map, i-1, j+1, flashed);
            checkFlash(map, i, j+1, flashed);
            checkFlash(map, i+1, j+1, flashed);
            checkFlash(map, i+1, j, flashed);
            checkFlash(map, i+1, j-1, flashed);
            checkFlash(map, i, j-1, flashed);

        }   
    }

    return;
}

//Part 2
//Logs the first step at which all octopi are in sync 
//and flash at the same step

function checkSyncFlash(input){
    let map = [];
    let flashed = new Map();
    let allFlashed;

    input.forEach(element => {
        map.push(element.split(''));
    });

    //increment energy level of all octopi
    for(let i = 0; i < 1000; i++){
        for(let j = 0; j < map.length; j++){
            for(let k = 0; k < map[0].length; k++){
                map[j][k]++;
            }
        }

        //check for flashes
        for(let j = 0; j < map.length; j++){
            for(let k = 0; k < map[0].length; k++){
                checkFlash(map, j, k, flashed);
            }
        }
        
        let flashesHere = 0;
        allFlashed = true;
        //set all flashed octopus energy to 0
        for(let j = 0; j < map.length; j++){
            for(let k = 0; k < map[0].length; k++){
                if(flashed.get(map.length * j + k)){
                    map[j][k] = 0;
                    flashesHere++;
                }
                else
                    allFlashed = false;
            }
        }

        if(allFlashed){
            console.log(`All Octopi Flashed at Step: ${i+1}`);
            return;
        }
        
        flashed.clear();
    }

    console.log(`Total Flashes: ${totalFlashes}`);
}