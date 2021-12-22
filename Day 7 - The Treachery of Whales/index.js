const fs = require('fs');
const readline = require('readline');

var input = [];
async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 7 - The Treachery of Whales/day7.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

async function main(){
    await readInput();
    minFuel();
}

main();

//brute-force the most optimal position for lowest fuel cost
function minFuel(){
    let positions = input[0].split(',');
    
    let fuelCosts = [];
    
    for(let i = 0; i < Math.max(...positions); i++){
        //fuel cost for position i
        fuelCost = 0;
        for(let j = 0; j < positions.length; j++){
            //fuelCost at position i for crab submarine j
            fuelCost += Math.abs(positions[j] - i);    //distance between this position and i
        }
        fuelCosts[i] = fuelCost;
    }

    let minFuelCost = Math.min(...fuelCosts);
    console.log(`Best Position: ${fuelCosts.indexOf(minFuelCost)}, Fuel Cost: ${minFuelCost}`);
}