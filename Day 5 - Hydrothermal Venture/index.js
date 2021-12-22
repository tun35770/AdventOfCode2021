const fs = require('fs');
const readline = require('readline');

var lines = [];
async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 5 - Hydrothermal Venture/day5.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        lines.push(line);
    }

    let coords = [];
    for(let i = 0; i < lines.length; i++){
        let newCoords = lines[i].split('->');
        let start = newCoords[0].split(',');
        let end = newCoords[1].split(',');
        
        coords[i] = start.concat(end);
        coords[i] = coords[i].map(function (x){
            return parseInt(x);
        })
    }
    //coords is now an array of 4-element arrays, containing in order x1,y1,x2,y2
    
    let map = [];

    //initialize map to all 0's
    for(let i = 0; i < 1000; i++){
        let column = [];
        for(let j = 0; j < 1000; j++){
            column[j] = 0;
        }

        map[i] = column;
    }

    let numOverlaps = 0;

    //iterate through all coords, increasing elements of map to represent lines
    coords.forEach(coord => {
        let x1 = coord[0], y1 = coord[1], x2 = coord[2], y2 = coord[3];
        let lowerBound, upperBound;

        //vertical line
        if(x1 == x2){
            if(y1 < y2)
                lowerBound = y1, upperBound = y2;
            else
                lowerBound = y2, upperBound = y1;
            for(let y = lowerBound; y <= upperBound; y++){
                map[x1][y]++;
            }
        }

        //horizontal line
        else if(y1 == y2){
            if(x1 < x2)
                lowerBound = x1, upperBound = x2;
            else   
                lowerBound = x2, upperBound = x1;

            for(let x = lowerBound; x <= upperBound; x++){
                map[x][y1]++;
            }
        }

        //45 degree line
        else{
            let lowerx, lowery, upperx, uppery;
            if(x1 < x2 && y1 < y2){
                while(x1 <= x2 && y1 <= y2){
                    map[x1][y1]++;
                    x1++;
                    y1++;
                }
            }
            else if (x1 < x2 && y1 > y2){
                while(x1 <= x2 && y1 >= y2){
                    map[x1][y1]++;
                    x1++;
                    y1--;
                }
            }
            else if(x1 > x2 && y1 < y2){
                while(x1 >= x2 && y1 <= y2){
                    map[x1][y1]++;
                    x1--;
                    y1++;
                }
            }
            else{ 
                while(x1 >= x2 && y1 >= y2){
                    map[x1][y1]++;
                    x1--;
                    y1--;
                }
            }

        }
    });

    //determine how many points have overlaps
    for(let i = 0; i < 1000; i++){
        for(let j = 0; j < 1000; j++){
            if(map[i][j] > 1)
                numOverlaps++;
        }
    }

    console.log(numOverlaps);
}

readInput();