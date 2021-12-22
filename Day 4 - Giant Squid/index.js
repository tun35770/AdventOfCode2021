const fs = require('fs');
const readline = require('readline');

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
    
    
    let finalDraw, unmarkedSum = 0;
    let winnerFound = false;
    let winCount = 0;

    draws.forEach(draw => {
        if(draw == 36){
            console.log(boards[15]);
        }
        if(winCount < 1){
            boards.forEach(board => {
                
                board.forEach(row => {
                    for(let i = 0; i < 5; i++){
                        if(row[i] == draw)
                            row[i] = -1;
                    }
                });
                
                //check if this board has won
                winnerFound = checkWinner(board);
                if(winnerFound && winCount < 1){
                    finalDraw = draw;
                    unmarkedSum = getUnmarkedSum(board);
                    console.log(`Final Draw: ${finalDraw}, Unmarked Sum: ${unmarkedSum}, Product: ${finalDraw*unmarkedSum}`);
                    console.log(`Index: ${boards.indexOf(board)}`);
                    console.log(board);
                    console.log(boards);
                    winCount++;
                }
                
            });
        }
    });
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

    if(flag)
        return flag;
    
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