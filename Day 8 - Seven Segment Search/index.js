const fs = require('fs');
const { parse } = require('path');
const { decode } = require('punycode');
const readline = require('readline');

let patterns = [];
let outputs = [];
var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 8 - Seven Segment Search/day8.txt'),
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
    occurences(); //Part 1
    //decodeInput();    //Part 2
}

main();

function occurences(){
    let numOccurences = 0;
    outputs.forEach(output => {
        output.forEach(line => {
            
            if(line.length == 2 || line.length == 3 || line.length == 4 || line.length == 7)
                numOccurences++;
        });
    });

    console.log(`Occurences of 1, 4, 7, or 8: ${numOccurences}`);
}

function decodeInput(){
    

    let decodedOutputs = [];
    
    for(let i = 0; i < patterns.length; i++){
        let mapping = new Map();
        let num2 = patterns[i].filter(line => line.length == 2);
        let num3 = patterns[i].filter(line => line.length == 3);

       
        for(i = 0; i < 2; i++){
            if(!num2.includes(num3.charAt(i)))
                mapping.set('a', num3.charAt(i));
        }

        //index 3 of num3
        if(!mapping.get('a'))
            mapping.set('a', num3.charAt(2));
        


    }
}

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