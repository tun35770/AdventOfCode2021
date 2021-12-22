const fs = require('fs');
const readline = require('readline');

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
    fishSim2(days);
}

main(256);

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

//run part 1 but for 256 days
//array will overflow, so instead of keeping track of each individual fish,
//keep track of the # of fish that have n days remaining
//an array of length 9 will cover 0-8 days remaining
//daysLeft[n] contains how many fish have n days left
//so, just shift everything left each day, moving daysLeft[0] to daysLeft[6],
//and adding the amount of fish with 0 days left to 8
function fishSim2(days){
    let fish = input[0].split(',');
    let daysLeft = [0,0,0,0,0,0,0,0,0];

    //increment number of fish with 'fish[i]' days left
    for(let i = 0; i < fish.length; i++){
        daysLeft[fish[i]]++;
    }

    for(let day = 0; day < days; day++){
        //shift all fish to day to the left
        let temp = [...daysLeft];
        for(let j = 0; j < 8; j++){
            daysLeft[j] = temp[j+1];
        }
        daysLeft[6] += temp[0];
        //add another fish for each fish that reset
        daysLeft[8] = temp[0];
        
    }

    let totalFish = 0;
    for(let i = 0; i < 9; i++){
        totalFish += daysLeft[i];
    }
    console.log(`TOTAL FISH AT DAY ${days}: ${totalFish}`);
}