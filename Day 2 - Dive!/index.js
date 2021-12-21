const fs = require('fs');
const readline = require('readline');

var commands = [];
async function readInput(){
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 2 - Dive!/day2.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        commands.push(line);
    }

    //PART A
    let horizontal = 0, depth = 0;
    commands.forEach(command => {
        //split line into direction and magnitude
        let splitCommand = command.split(" ");
        let magnitude = parseInt(splitCommand[1]);

        //check direction, add magnitude to correct variable
        if(splitCommand[0] == 'forward'){
            horizontal += magnitude;
        }
        if(splitCommand[0] == 'up'){
            depth -= magnitude;
        }
        if(splitCommand[0] == 'down'){
            depth += magnitude;
        }
    })
    //print the product (the answer)
    console.log(`Horizontal: ${horizontal}, Depth: ${depth}, Product: ${horizontal*depth}`);

    //PART B
    horizontal = 0;
    depth = 0;
    let aim = 0;
    commands.forEach(command =>{
        //split line into direction and magnitude
        let splitCommand = command.split(" ");
        let magnitude = parseInt(splitCommand[1]);

         //check direction, add magnitude to correct variable
        if(splitCommand[0] == 'forward'){
            horizontal += magnitude;
            depth += aim*magnitude;
        }
        if(splitCommand[0] == 'up'){
            aim -= magnitude;
        }
        if(splitCommand[0] == 'down'){
            aim += magnitude;
        }
    })

    console.log(`Horizontal: ${horizontal}, Depth: ${depth}, Product: ${horizontal*depth}`);
}

readInput();