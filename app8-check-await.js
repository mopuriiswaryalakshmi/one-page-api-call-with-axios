const express = require('express');
const fs = require("fs");

const app = express()
app.use(express.json())


function sum(a, b) {
    console.log("Hiii")
    fs.readFileSync('./test.json', 'utf8');
    console.log("How are you")
    return a+b
}

sum(2, 3)
console.log("I am outside")
