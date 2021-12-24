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
    //parseStack(input);  //Part 1
    incompleteScore(input);
}

main();

//Determine corrupted score of all lines
//If an opening (, {, [, or < is closed with the wrong bracket,
//score is increased based on value given by problem
//If so, increase score and move to next line
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

//Find median score of completion scores
//For only non-corrupt lines, find brackets required to complete it
//Score each line based on point values in problem
function incompleteScore(input){
    let scores = [];
    let filteredInput = removeCorruptedLines(input);

    filteredInput.forEach(line => {
        let stack = [];
        let completion = [];

        //build stack
        for(let i = 0; i < line.length; i++){
            let c = line.charAt(i);
            if(c == '{' || c == '(' || c == '[' || c == '<'){
                stack.push(c);
            }
            else    stack.pop();
        }

        let score = 0;
        while(stack.length > 0){
            let c = stack.pop()
            score *= 5;
            if(c == '('){
                score++;
                completion.push(')');
            }
            else if(c == '['){
                score += 2;
                completion.push(']');
            }
            else if(c == '{'){
                score += 3;    
                completion.push('}');
            }
            else if(c == '<'){
                score += 4;    
                completion.push('>');
            }
        }

        scores.push(score);
    })

    //sort scores, get median
    scores.sort(function(a, b) {
        return a - b;
      });
      
    console.log(scores);
    console.log(`Median Score: ${scores[(scores.length-1)/2]}`);
}

function removeCorruptedLines(input){
    for(let i = 0; i < input.length; i++){
        let line = input[i];
        let stack = [];

        for(let j = 0; j < line.length; j++){
            let c = line.charAt(j);
            if(c == '{' || c == '(' || c == '[' || c == '<'){
                stack.push(c);
            }
            else{
                let s = stack.pop();
                if( (c == ')' && s != '(') ||
                    (c == ']' && s != '[') ||
                    (c == '}' && s != '{') ||
                    (c == '>' && s != '<')){
                        console.log(`Removed: ${s}${c}`);
                        input.splice(i, 1);
                        i--;
                        break;
                }
            }
        }
    }

    return input;
}