const fs = require('fs');
const readline = require('readline');
const { deflateSync } = require('zlib');

var input = [];
async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 6 - Lanternfish/day6.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }

    
}

async function main(days){
    await readInput();
    fishSim(days);
}

main(80);

function fishSim(days){
    //create fish array
    let fish = input[0].split(',');

    //iterate through all the days
    for(let day = 0; day < days; day++){

        //keep track of this days starting number of fish
        let numFish = fish.length;
        //decrease gestation period of each fish by 1, add new fish if period goes below 0
        for(let j = 0; j < numFish; j++){
            fish[j]--;
            if(fish[j] == -1){
                fish[j] = 6;    //reset this fish' counter
                fish.push(8);   //add a new fish with gestation period 8, as given by the problem
            }
        }
    }

    console.log(`TOTAL FISH AT DAY ${days}: ${fish.length}`);
}