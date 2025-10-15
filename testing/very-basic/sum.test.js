const sum = require("./sum");

if(sum(2,3) != 5) {
    throw Error("test 1 failed");
}

if(sum(2,5) != 7) {
    throw Error("test 2 failed");
}

console.log("success");