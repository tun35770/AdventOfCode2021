const fs = require('fs');
const { parse } = require('path');
const { ppid } = require('process');
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
    //occurences();   //Part 1
    decodeInput();    //Part 2
}

main();

//coutns the occurences of the numbers 1,4,7,and 8
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

//***This is the dirtiest solution I have yet come up with***
//Does a lot of stuff
function decodeInput(){
    let sumOfOutputs = 0;


    for(let i = 0; i < patterns.length; i++){
        let pattern = patterns[i];
        let output = outputs[i];
        let mappings = new Map();

        let num2 = pattern.filter(line => line.length == 2);
        let num3 = pattern.filter(line => line.length == 3);
       
        //figure out which letter is 'a'
        for(let j = 0; j < 3; j++){
            if(!num2[0].includes(num3[0].charAt(j)))
                mappings.set('a', num3[0].charAt(j));
        }

        let occurences = new Map();  
        
        //find other letters
        for(let j = 0; j < pattern.length; j++){
            for(let k = 0; k < pattern[j].length; k++){
                let letter = pattern[j].charAt(k);
                if(!occurences.get(letter))
                    occurences.set(letter, 1)
                else
                    occurences.set(letter, occurences.get(letter)+1)
            }
        }

        let notAdded = [];
        occurences.forEach((value, key) => {
            if(value == 4)
                mappings.set('e', key)
            if(value == 6)
                mappings.set('b', key);
            if(value == 9)
                mappings.set('f', key);
            if(value == 8 && key != mappings.get('a'))
                mappings.set('c', key);
            if(value == 7)
                notAdded.push(key);
        })

        //figure out d and g
        for(let j = 0; j < pattern.length; j++){
            if(pattern[j].length == 4){
                for(let k = 0; k < pattern[j].length; k++){
                    letter = pattern[j].charAt(k);
                    let containsLetter = false;
                    mappings.forEach((value, key) => {
                        if (value == letter)
                            containsLetter = true;
                    })

                    if(containsLetter == false){
                        mappings.set('d', letter)
                        notAdded.splice(notAdded.indexOf(letter), 1);
                        mappings.set('g', notAdded[0]);
                    }
                }
            }
        }

        let zero = `${mappings.get('a')}${mappings.get('b')}${mappings.get('c')}${mappings.get('e')}${mappings.get('f')}${mappings.get('g')}`;
        let one = `${mappings.get('c')}${mappings.get('f')}`;
        let two = `${mappings.get('a')}${mappings.get('c')}${mappings.get('d')}${mappings.get('e')}${mappings.get('g')}`;
        let three = `${mappings.get('a')}${mappings.get('c')}${mappings.get('d')}${mappings.get('f')}${mappings.get('g')}`;
        let four = `${mappings.get('b')}${mappings.get('c')}${mappings.get('d')}${mappings.get('f')}`;
        let five = `${mappings.get('a')}${mappings.get('b')}${mappings.get('d')}${mappings.get('f')}${mappings.get('g')}`;
        let six = `${mappings.get('a')}${mappings.get('b')}${mappings.get('d')}${mappings.get('e')}${mappings.get('f')}${mappings.get('g')}`;
        let seven = `${mappings.get('a')}${mappings.get('c')}${mappings.get('f')}`;
        let eight = `${mappings.get('a')}${mappings.get('b')}${mappings.get('c')}${mappings.get('d')}${mappings.get('e')}${mappings.get('f')}${mappings.get('g')}`;
        let nine = `${mappings.get('a')}${mappings.get('b')}${mappings.get('c')}${mappings.get('d')}${mappings.get('f')}${mappings.get('g')}`;

        
        let numbers = [zero, one, two, three, four, five, six, seven, eight, nine];
        
        for(let j = 0; j < 10; j++){
            numbers[j] = numbers[j].split('').sort((a, b) => a.localeCompare(b)).join('');
        }

        let outputValue = 0;
        //mappings should now be complete
        for(let j = 0; j < 4; j++){
            const sortedOutput = output[j].split('').sort((a, b) => a.localeCompare(b)).join('');

            for(let k = 0; k < 20; k++){
                if(sortedOutput == numbers[k]){
                    outputValue += k * Math.pow(10, 3-j);   
                }
            }
        }

        sumOfOutputs += outputValue;
    }

    console.log(`SUM OF OUTPUTS: ${sumOfOutputs}`);
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

//a 8 -
//b 6 -
//c 8 -
//d 7
//e 4 -
//f 9 -
//g 7