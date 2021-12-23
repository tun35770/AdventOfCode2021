const fs = require('fs');
const readline = require('readline');

let patterns = [];
let outputs = [];
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
    parseInput();

}

main();

function parseInput(){

    //parse input for each pattern and output
    input.forEach(line => {
        let pattern = [], output = [];
        pattern = line.split(' ');

        for(let i = 0; i < 4; i++){
          output.push(pattern.pop());
        }

        output = output.reverse();
        pattern.pop(); //remove '|'

        patterns.push(pattern);
        outputs.push(output);
    });
}