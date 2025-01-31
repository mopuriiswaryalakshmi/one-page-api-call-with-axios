'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'processLogs' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY logs
 *  2. INTEGER maxSpan
 */

function processLogs(logs, maxSpan) {
    
    // console.log(maxSpan)
    // console.log(logs)
    
    // Write your code here
    const signInMap = new Map()
    const validUsers = new Set()
    
    for(const log of logs) { // ["30 99 sign-in", "30 105 sign-out"]
        const [userId, timestamp, action] = log.split(" ")
        
        if(action == "sign-in") {
            signInMap.set(userId, Number(timestamp))
        } else if(action == "sign-out" && signInMap.has(userId)) {
            const signInTime = signInMap.get(userId)
            const signOutTime = Number(timestamp)
           
            
            if(signOutTime - signInTime  <= maxSpan) {
                validUsers.add(userId)
            }

            signInMap.delete(userId)
        }
    }
    console.log(signInMap)
    console.log(validUsers)
    console.log(Array.from(validUsers))
    
    return Array.from(validUsers).sort((a, b) => Number(a) - Number(b))

}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const logsCount = parseInt(readLine().trim(), 10);

    let logs = [];

    for (let i = 0; i < logsCount; i++) {
        const logsItem = readLine();
        logs.push(logsItem);
    }

    const maxSpan = parseInt(readLine().trim(), 10);

    const result = processLogs(logs, maxSpan);

    ws.write(result.join('\n') + '\n');

    ws.end();
}

const maxSpan = 20
const logs = ["30 99 sign-in", "30 105 sign-out", "12 100 sign-in", "20 80 sign-in", "12 120 sign-out", "20 101 sign-out", "201 101 sign-in"]
console.log(processLogs(logs, maxSpan))

