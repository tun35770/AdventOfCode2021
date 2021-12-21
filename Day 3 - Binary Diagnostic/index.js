const fs = require('fs');
const readline = require('readline');

var report = [];
async function readInput(){
    const rl = readline.createInterface({
        input: fs.createReadStream('./Day 3 - Binary Diagnostic/day3.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        report.push(line);
    }

    //PART A
    let bits = report[0].length;
    let gamma = "", epsilon = "";

    //figure out gamma in binary
    //most common bit in each index is bit of gamma
    for(let i = 0; i < bits; i++){
        let ones = 0, zeroes = 0;
        report.forEach(number =>{
            if(number[i] == '0')
                zeroes++;
            else
                ones++;
        })

        if(ones > zeroes)
            gamma = gamma.concat("1");
        else
            gamma = gamma.concat("0");
    }

    
    //convert binary gamma into a decimal number
    let gammaValue = 0;
    for(let i = 0; i < gamma.length; i++){
        if(gamma[i] == "1"){
            gammaValue +=Math.pow(2, (gamma.length-i-1));
        }
    }

    //get epsilon in binary, which is inverted gamma
    for(let i = 0; i < gamma.length; i++){
        if(gamma[i] == '0')
            epsilon = epsilon.concat('1');
        else
            epsilon = epsilon.concat('0');
    }

    //convert epsilon to decimal number
    let epsilonValue = 0;
    for(let i = 0; i < epsilon.length; i++){
        if(epsilon[i] == "1"){
            epsilonValue +=Math.pow(2, (epsilon.length-i-1));
        }
    }

    //answer is gamma*epsilon
    console.log(`GAMMA: ${gammaValue}, EPSILON: ${epsilonValue}, PRODUCT: ${gammaValue*epsilonValue}`);

    //PART B
    //------------------------------
    let oxyRating = 0, CO2Rating = 0;
    let filteredReport = [...report];

    //find number with only most common bits (OXY)
    for(let i = 0; i < bits; i++){
        let ones = 0, zeroes = 0;
        filteredReport.forEach(number =>{
            if(number[i] == '0')
                zeroes++;
            else
                ones++;
        })

        if(ones >= zeroes)
            filteredReport = filteredReport.filter(number => number[i] == '1');
        else
            filteredReport = filteredReport.filter(number => number[i] == '0');

        if(filteredReport.length == 1)
            break;
    }

    let mostCommon = filteredReport[0];
    console.log(`FILTERED: ${mostCommon}`);

    //convert binary oxygen rating to decimal
    for(let i = 0; i < mostCommon.length; i++){
        if(mostCommon[i] == "1"){
            oxyRating +=Math.pow(2, (bits-i-1));
        }
    }

    console.log(`OXY RATING: ${oxyRating}`);

    //reset filteredReport
    filteredReport = [...report];

    //find number with only least common bits (CO2)
    for(let i = 0; i < bits; i++){
        let ones = 0, zeroes = 0;
        filteredReport.forEach(number =>{
            if(number[i] == '0')
                zeroes++;
            else
                ones++;
        })

        if(ones >= zeroes)
            filteredReport = filteredReport.filter(number => number[i] == '0');
        else
            filteredReport = filteredReport.filter(number => number[i] == '1');

        if(filteredReport.length == 1)
            break;
    }

    let leastCommon = filteredReport[0];
    console.log(`FILTERED: ${leastCommon}`);

    //convert CO2 rating to decimal
    for(let i = 0; i < leastCommon.length; i++){
        if(leastCommon[i] == "1"){
            CO2Rating += Math.pow(2, (bits-i-1));
        }
    }

    console.log(`CO2 RATING: ${CO2Rating}`);
    console.log(`LIFE SUPPORT RATING: ${oxyRating*CO2Rating}`);
}
readInput();