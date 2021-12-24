const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 10 - Syntax Scoring/day10.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

async function main(){
    await readInput();
    parseStack(input);
}

main();

function parseStack(input){

    let score = 0;
    input.forEach(line => {
        let stack = [];
        let corrupted = false;

        for(let i = 0; i < line.length; i++){
            let c = line.charAt(i);
            if(c == '{' || c == '(' || c == '[' || c == '<'){
                stack.push(c);
            }
            else{
                let s = stack.pop();
                if(c == ')' && s != '('){
                    score += 3;
                    break;
                }
                if(c == ']' && s != '['){
                    score += 57;
                    break;
                }
                if(c == '}' && s != '{'){
                    score += 1197;
                    break;
                }
                if (c == '>' && s != '<'){
                    score += 25137;
                    break;
                }
            }
        }
    })

    console.log(`Corrupted Score: ${score}`);
}