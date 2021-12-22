//PART 2
//Im copying a lot of code ... i dont care
//okay i do actually care but its too late now \_(O_O   )_/

const fs = require('fs');
const readline = require('readline');
var lastBoard, unmarkedSum, finalDraw;
var bingo = [];
async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 4 - Giant Squid/day4.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        bingo.push(line);
    }

    //remove empty lines
    bingo = bingo.filter(line => line != '');
    //get the numbers to be drawn
    let draws = bingo[0].split(",");
    draws = draws.map(function (x) {
        return parseInt(x);
    });
    
    let boards = [];

    //create all boards, add to boards array
    for(let i = 1; i < bingo.length; ){
        let board = [];
        for(let j = 0; j < 5; j++){
            board[j] = bingo[i+j].split(' ');
            
            board[j] = board[j].map(function (x){
                return parseInt(x);
            })

            board[j] = board[j].filter(Number.isFinite);
        }
        
        boards.push(board);
        i+=5;
    }

    let boards2 = [...boards];
    let winnerFound = false;
    let index;
    draws.forEach(draw => {

            boards.forEach(board => {

                board.forEach(row => {
                    for(let i = 0; i < 5; i++){
                        if(row[i] == draw)
                            row[i] = -1;
                    }
                });
                
                //check if this board has won
                //Somehow this works, I didnt question it 
                winnerFound = checkWinner(board);
                if(winnerFound && boards2.indexOf(board) != -1){
                    finalDraw = draw;
                    unmarkedSum = getUnmarkedSum(board);
                    index = boards2.indexOf(board);
                    boards2.splice(index, 1);
                }  
            });
    });

    console.log(`Final Draw: ${finalDraw}, Sum: ${unmarkedSum}, Product: ${finalDraw*unmarkedSum}`);
    
}

readInput();

function checkWinner(board){
    const allEqual = (value) => value == -1;
    let flag = false;
    //check rows
    board.forEach(row => {
        if(row.every(allEqual))
            flag = true;
    })
    
    //check columns
    for(let i = 0; i < 5; i++){
        let column = [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i]];
        if(column.every(allEqual))
            flag = true;
    }

    return flag;
}

function getUnmarkedSum(board){
    let sum = 0;
    board.forEach(row =>{
        for(let i = 0; i < 5; i++){
            if(row[i] != -1)
                sum += row[i];
        }
    })

    return sum;
}