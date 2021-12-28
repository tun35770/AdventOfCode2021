const fs = require('fs');
const readline = require('readline');
const { isArgumentsObject } = require('util/types');

var input = [];
let folds = [];
let dots = [];
let dotsMap = new Map();
let maxX = 0, maxY = 0;

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 13 - Transparent Origami/day13.txt'),
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
    singleFold();
}

main();

const parseInput = () => {
    for(let i = input.length-12; i < input.length; i++){
        let fold = input[i].substring(11).split('=');
        fold[1] = parseInt(fold[1]);
        folds.push(fold);
    }

    for(let i = 0; i < input.length-13; i++){
        dots.push(input[i].split(',').map(x => parseInt(x)));
        
        if(dots[i][0] > maxX)
            maxX = dots[i][0];
        if(dots[i][1] > maxY)
            maxY = dots[i][1];
    }

    for(let i = 0; i < dots.length; i++){
        dotsMap.set(maxX * dots[i][0] + dots[i][1], 1);
    }

    dots.sort((a,b) => {
        return a[0] - b[0];
    })

}

//Part 1
//Folds a single time
//For each dot with a row greater than the fold row,
//deletes its mirror position dot (if it exists)
const singleFold = () => {
    let rowToFold = folds[0][1];

    dots.forEach(dot => {
        if(dot[0] > rowToFold){
            dotsMap.delete(maxX * (rowToFold - (dot[0] - rowToFold)) + dot[1]);
        }
    })

    console.log(dotsMap.size);
}