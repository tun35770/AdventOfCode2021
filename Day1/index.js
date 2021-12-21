const fs = require('fs');
const readline = require('readline');

var depths = [];
async function readInput(){
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day1/day1.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        depths.push(parseInt(line));
    }
    
    //PART A
    let count = 0;
    console.log("Length: " + depths.length);
    for(let i = 1; i < depths.length; i++){
        if(depths[i] > depths[i-1]) count++;
    }

    console.log(count);

    //PART B
    let sums = [];
    for(let i = 2; i < depths.length; i++){
        sums.push(depths[i-2]+depths[i-1]+depths[i]);
    }

    let sumCount = 0;
    console.log("Length: " + sums.length);
    for(let i = 1; i < sums.length; i++){
        if(sums[i] > sums[i-1]) sumCount++;
    }

    console.log(sumCount);
}

readInput();