//wordList.txt => wirdList.json
const fs = require("fs");
const input = __dirname + "/wordList.txt"
const output = __dirname + "/wordList.json"

const file = fs.readFileSync(input, "utf-8");
let wordList = file.toString().split("\n");
wordList.pop();

const json = JSON.stringify({
    wordList: wordList
})

fs.writeFileSync(output, json);
